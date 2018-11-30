/*
    Josh Huff's HowTo:
    reddit API Interaction Example  
*/

// Get authorized by requesting a token
var tokenReq = new XMLHttpRequest();

var base = "https://www.reddit.com/api/v1/access_token";
var clientID = "qB_dSj9_c6a9GA";
var secret = "L_SQ3VTaadD8UaYdsg19md4cavc";    

tokenReq.open("POST", base, false); 

tokenReq.setRequestHeader("Authorization", 
                            "Basic " + btoa(clientID + ":" + secret));
tokenReq.setRequestHeader("Content-Type", 
                            "application/x-www-form-urlencoded");

var bearer = "bearer ";
tokenReq.addEventListener("load", function(){
    
    if(tokenReq.status >= 200 && tokenReq.status < 400){
       response = JSON.parse(tokenReq.responseText);
       bearer += response;
       console.log(response);
    }else{
       console.log("Network error");
    }
});

tokenReq.send("grant_type=client_credentials");

// Using that token, make a GET request about a subreddit
var aboutSubReq = new XMLHttpRequest();

var oauthBase = "https://oauth.reddit.com";
var exampleRequest = "/r/poker/about/";  
var exampleResponse;

aboutSubReq.open("GET", oauthBase + exampleRequest, false);

aboutSubReq.setRequestHeader("Authorization", 
                                bearer);
aboutSubReq.setRequestHeader("Content-Type", "application/JSON");

aboutSubReq.addEventListener("load", function(){
    
    if(aboutSubReq.status >= 200 && aboutSubReq.status < 400){
       exampleResponse = JSON.parse(aboutSubReq.responseText);
       console.log(exampleResponse);
    }else{
       console.log("Network error"); 
    }
});

aboutSubReq.send();

var test = exampleResponse.data.public_description;
console.log(test);



