module Services
  class MenuDataCleaner
    include Constants::Stopwords

    ENCODING_OPTIONS = {
      :invalid           => :replace,  # Replace invalid byte sequences
      :undef             => :replace,  # Replace anything not defined in ASCII
      :replace           => '',        # Use a blank for those replacements
      :universal_newline => true       # Always break lines with \n
    }

    # string = RTesseract.new('./app/assets/images/test.png').to_s

    def initialize(string)
      @ingredients = string
    end

    def clean!
      @ingredients = @ingredients.split(" ").map{ |word| word.downcase }
      remove_non_ascii_chars
      remove_non_alpha_words
      remove_stopwords
      uniquify
    end

    private

    attr_accessor :ingredients

    def remove_non_ascii_chars
      @ingredients = @ingredients.map{ |word| word.encode(Encoding.find('ASCII'), ENCODING_OPTIONS) }
    end

    def remove_stopwords
      @ingredients = @ingredients.reject{|word| DEFAULT_ENGLISH_STOPWORDS.include?(word) || RESTAURANT_SPECIFIC.include?(word)}
    end

    def remove_non_alpha_words
      @ingredients = @ingredients.map do |word|
        word.split('').reject{|letter| ['|','$','.',':',',','/','(',')',';','!','#','=',''].include?(letter)}.join
      end
      @ingredients = @ingredients.reject{|word| word.to_i != 0 }
    end

    def uniquify
      @ingredients.uniq
    end
  end
end
