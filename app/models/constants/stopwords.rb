module Constants
  module Stopwords
    DEFAULT_ENGLISH_STOPWORDS = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thick", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"]

    RESTAURANT_SPECIFIC = ["sauteed", "sautéed", "grilled", "available", "topped", "choice", "choices", "cut", "chunks", "thin", "seasoned", "house", "served", "crunchy", "plate", "dish", "tossed", "toasted", "choose", "blend", "drizzle", "regular", "large", "medium", "small", "cal", "calories", "pair", "pairs", "warm", "cold", "signature", "classic", "new", "traditional", "wrapped","scrambled","cooked","request","stuffed","supreme","flat","pulled","dishes","dish","available","add","aside","chopped","deep","fried","prepared","draft","homemade","spicy","dipping","tender","recipe","lightly","heavy","pm","am","freshly","handcrafted","pick","side","sides","favorite","favorites","charge","outside","inside","flavored","natural","natural-cut","ultimate","collection","gooey","perfect","sharing","pass","filled","flavor","goodness","dunk","dunking","dunked","that's","making","perfection","goodness","enjoy","things","share","infused","mouthwatering","best","dipped","especially","timeless","all-star","sampler","paired","combo","taste","named","place","order","reasons","need","reason","server","serving","takes","pride","unavailable","additional","day","crave","want","different","generous","fave","final","touch","high","piled","finished","occasion","inventory","it's","basket","baskets","special","garden","ask","resorting","perfectly","make","loaded","nutrition","general","used","depleted","advice","calorie","needs","flavor-packed","packed","award-winning","try","bed","options","option","ingredients","ingredient"]
  end
end

<div class="container">
  <h1 class="title">Question Import</h1>
    <%= form_tag({action: :upload}, multipart: true, method:'post') do %>
      <div class="field">
        <div>
          <%= label_tag('input_file', 'Select a CSV to upload', class: 'label') %>
          <%= file_field_tag 'file', required: true %>
        </div>
      </div>
      <div class="control">
        <%= submit_tag('Submit', class: 'button is-primary') %>
      </div>
    <% end %>
</div>
<br>
<div class="container">
  <% flash.each do |key, value| %>
  <div class="alert alert-<%= key %>"><%= value %></div>
  <% end %>
</div>
<div class="container">
<h5 class="title is-5">
  Question Import Rules:
</h5>
<p>
  For successful import, file must be a CSV (.csv exstension) and follow the rules for each column type below:
</p>
<div class="table-container">
  <table class="table is-bordered is-fullwidth is-hoverable">
    <thead>
      <% @headers.each do |header| %>
        <th><%= String(header) %></th>
      <% end %>
    </thead>
    <tbody>
        <tr>
          <td>
            <li> Must be a number</li>
            <li> Must be unique</li>
          </td>
          <td>
            <li>Must be an ID of existing parent question</li>
            <li>Child question row must come <em>after</em> parent question</li>
          </td>
          <td>
            <li>Must be one of these values: <b>Contact</b>, <b>Introduction</b>, <b>Screening</b>, <b>Exposure</b>, <b>Other</b>, <b>Symptoms</b>, <b>Onset_duration</b>, <b>Outcomes</b>, <b>Demographics</b></li>
          </td>
          <td>
          </td>
          <td>
            <li><b>Y</b> will mark question as mandatory. Any other value will not.</li>
            <li>Mandatory questions will automatically appear on every questionnaire highlighted in gray.</li>
          </td>
          <td>
            <li>Must be one of these values: <b>radio</b>, <b>checkbox</b>, <b>text</b>, <b>number</b>, <b>instructions</b></li>
          </td>
          <td>
            <li>Choices must be separated with a <b>|</b></li>
          </td>
          <td>
            <li><a href="/admin/dashboard/tags">See list of valid tags</a></li>
            <li>Questions that should appear on every questionnaire must have tag <b>universal</b></li>
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
          <td>
            Redcap field
          </td>
        </tr>
    </tbody>
  </table>
</div>
<h5 class="title is-5">
  <p><%= link_to "Click here to download example CSV", admin_dashboard_sample_csv_path(:format => "csv")%></p>
</h5>
<div>
<div class="container">
  <div class="field is-grouped">
    <button class="button">
      <a class="html-link" href="/admin/dashboard/questions">View Imported Questions</a>
    </button>
    <button class="button ">
      <a class="html-link" href="/">Back</a>
    </button>
  </div>
</div>
