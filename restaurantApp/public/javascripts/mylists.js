// $(document).ready(function()  {
//   delRest();

//   // makes the API request to search for restaurants in city
//   function getRestaurants() {
//     $('#restCards').empty();
//     function cb(data) {        
//       console.log("cb: " + JSON.stringify(data));
//     }
            
//     var auth = {
//         //
//         // Update with your auth tokens.
//         //
//         consumerKey : "S3yH_0hNDtkO4SYOZiFROA",
//         consumerSecret : "NXQro3vSpGwgaMuL3N7OeUVi9xc",
//         accessToken : "5QfCEAXQD-CqfMMv_hUg2VJbObcZV91z",
//         // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
//         // You wouldn't actually want to expose your access token secret like this in a real application.
//         accessTokenSecret : "BAsY9N0jdeaL6QVPWcAqiBVP4FU",
//         serviceProvider : {
//             signatureMethod : "HMAC-SHA1"
//         }
//     };

//     // var limit = '20';
//     var sort = '0';
//     var term = 'food'
//     var near = $('#searchLocation').val();

//     var accessor = {
//         consumerSecret : auth.consumerSecret,
//         tokenSecret : auth.accessTokenSecret
//     };

//     var parameters = [];
//     // parameters.push(['limit', limit]);
//     parameters.push(['sort', sort]);
//     parameters.push(['term', term]);
//     parameters.push(['location', near]);
//     parameters.push(['callback', 'cb']);
//     parameters.push(['oauth_consumer_key', auth.consumerKey]);
//     parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
//     parameters.push(['oauth_token', auth.accessToken]);
//     parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

//     var message = {
//         'action' : 'https://api.yelp.com/v2/search',
//         'method' : 'GET',
//         'parameters' : parameters
//     };

//     OAuth.setTimestampAndNonce(message);
//     OAuth.SignatureMethod.sign(message, accessor);

//     var parameterMap = OAuth.getParameterMap(message.parameters);
        
//     $.ajax({
//         'url' : message.action,
//         'data' : parameterMap,
//         'dataType' : 'jsonp',
//         'jsonpCallback' : 'cb',
//         'cache': true
//     })
//     .done(function(response) {
//             for (var i = 0; i < response.businesses.length; i++) {
//                 var name = response.businesses[i].name;
//                 var address = "<p>"+response.businesses[i].location.display_address.join("</p><p>")+"</p>";
//                 var rawadd = response.businesses[i].location.display_address;
//                 var restimg = response.businesses[i].image_url;
//                 var rating = Math.round(response.businesses[i].rating);



//                 var card = "";
//                 //add restaurant image
//                 card += "<div class='ui centered card' id='rest"+i+"'><div class='image'><img src='"+restimg+"'></div>";
//                 // add name
//                 card += "<div class='content'><div class='header'>"+name+"</div>";
//                 // add address
//                 card += "<div class='description'>"+address+"</div></div>";
//                 // add button

//                 console.log(near);
//                 var add = "addRest(\'" + encodeURIComponent(near) + "\',\'" + encodeURIComponent(name) + "\',\'" + encodeURIComponent(rawadd) + "\',\'" + encodeURIComponent(restimg) +"\')"
//                 var del = "delRest(\'" + encodeURIComponent(near) + "\',\'" + encodeURIComponent(name) + "\',\'" + encodeURIComponent(rawadd) + "\',\'" + encodeURIComponent(restimg) +"\')"
//                 card += "<div class='extra content'><div class='ui two buttons'><div class='ui bottom attached button' onclick="+add+"><i class='add icon'></i>Add</div>";
//                 card += "<div class='ui bottom attached button' onclick="+del+"><i class='remove icon'></i>Remove</div></div></div></div>";
//                 // card += "<div class='ui popup'><div class='header'>Rating</div><div class='ui star rating' data-rating='3'></div></div></div>";

//                 // add card to cards list
//                 $('#restCards').append(card);

//            }
//         }
//     )
//     .fail(function(jqXHR, textStatus, errorThrown) {
//                         console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
//             }
//     );
//     $("form").trigger("reset");
//     event.preventDefault();
//   }
// });
 
// // handles possible keypress GUI for users wanting to search using enter key
// $(function(){
//   $('#sf').keypress(function(e){
//     if(e.which == 13) {
//       getRestaurants();
//       e.preventDefault();
//     }
//   });
// });

$(document).ready(function() {
  showLists();
  $('.ui.accordion').accordion();
  // $(".ui.accordion .title:eq(0)").on("click", function() {
  //   console.log("triggered");
  // });
});

function triggered(number) {
  console.log(number);
}

function showLists() {
  console.log("showlists called");

  // find all restaurants that has the same username
  $.ajax({
            url: './lists',
            type: 'GET',
            data: {},
            success:function(result){
                console.log("Successfully retrieved item");
                $('#lists').html(result);
                var info = sortinfo();

                $('#lists').html(info);
            }
        });
}

function sortinfo() {
  var jsonstr = $('#obj').text();
                var data = JSON.parse(jsonstr);

                var unique = {};
                var distinct = [];
                for( var i in data ){
                 if( typeof(unique[data[i].title]) == "undefined"){
                  distinct.push(data[i].title);
                 }
                 unique[data[i].title] = "";
                }

                var titles = "<p>"+distinct.join("</p><p>")+"</p>"
}

function delRest(title, name, address, img) {
  console.log("del clicked");

  var restinfo = {};
  restinfo.name = decodeURIComponent(name);
  restinfo.address = decodeURIComponent(address);
  restinfo.img = decodeURIComponent(img);

  console.log(restinfo);

  // delete restaurant that matches username, title, and restaurant details
  $.ajax({
            url: './lists',
            type: 'DELETE',
            data: { title: decodeURIComponent(title), restaurant: restinfo },
            success:function(result){
                console.log("Successfully deleted item");
            }
        });
        event.preventDefault();
}