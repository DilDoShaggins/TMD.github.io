/* GateKeeper
   http://www.HTMLisEasy.com/keeper/
*******************************************/

function gateKeeper(){
   var un = window.document.keeperform.keeperuser.value;
   var pw = window.document.keeperform.keeperpass.value; var t = keeperTos(keepersp);
   if(window.document.keeperform.keepersave.checked == true) { var sp = 1; } else { var sp = 0; }
   if( (un.length > 0)&&(pw.length > 0) ) { location.href = kStrEncode(t) + kidxslsh + kStrEncode(kidx)
   + '.' + kStrEncode(keeperTos(kxt)) + '?u=' + kStrEncode(un) + '&p=' + kStrEncode(pw) + '&s=' + sp; }
   else if( (un.length == 0)&&(pw.length == 0) ) { alert("Please enter username & password."); }
   else if( (un.length > 0)&&(pw.length == 0) ) { alert("Please enter password."); }
   else if( (un.length == 0)&&(pw.length > 0) ) { alert("Please enter username."); }
}


// GET a cookie - return cookie value or false
function keeperGetCookie(name){
   var cname = name + "=";
   var dc = document.cookie;
   if (dc.length > 0) {
      begin = dc.indexOf(cname);
      if (begin != -1) {
         begin += cname.length;
         end = dc.indexOf(";", begin);
         if (end == -1) end = dc.length;
         return unescape(dc.substring(begin, end));
      }
   }
   return false;
}


// SET a cookie
function keeperSetCookie(name, value, expires) {
   document.cookie = name + "=" + escape(value) + "; path=/" +
   ((expires == null) ? "" : "; expires=" + expires.toGMTString());
}


// TEST if cookies are enabled - return true or false
function keeperTestCookiesEnabled(){
   keeperSetCookie('keepertest', 1);
   if (keeperGetCookie('keepertest') == 1) {
      var minusone = new Date();
      minusone.setTime(minusone.getTime() - (1000 * 60 * 60 * 24));
      keeperSetCookie('keepertest', "", minusone);
      return true;
   }
   else { return false; }
}


// CHECK for url substring - return substring or false
function keeperCheckURLsubstring(){
   var substr = location.search.substring(1);
   if (substr.length > 0) { return substr; } else { return false; }
}


// CHECK url substring for user - return user or false
function keeperCheckURLsubstringUser(){
   var qsa = location.search.substring(1).split("&");
   var qsa_user = qsa[0].substring(2,qsa[0].length);
   if (qsa_user.length > 0) { return kStrDecode(qsa_user); } else { return false; }
}


// CHECK url substring for pass - return pass or false
function keeperCheckURLsubstringPass(){
   var qsa = location.search.substring(1).split("&");
   var qsa_pass = qsa[1].substring(2,qsa[1].length);
   if (qsa_pass.length > 0) { return kStrDecode(qsa_pass); } else { return false; }
}


// CHECK url substring for savepass flag - return true or false
function keeperCheckURLsubstringSave(){
   var qsa = location.search.substring(1).split("&");
   var qsa_save = qsa[2].substring(2,qsa[2].length);
   if (qsa_save == 1) { return true; } else { return false; }
}


// CHECK for userpass - return true or false
function keeperCheckUserList(user,pass){
   var isgood = 0;
   for (var i = 0; i < keeperAllUsers.length; i+=2){
      if( (keeperAllUsers[i] == user) && (keeperAllUsers[i+1] == pass) ) { isgood = 1; }
   }
   if (isgood == 1) { return true; } else { return false; }
}



function keeperPerformCheck(){
   var getIn = "no";
   if ( keeperTestCookiesEnabled() )
   {
      if( keeperCheckURLsubstring() )
      {
         if( ( keeperCheckURLsubstringUser() ) && ( keeperCheckURLsubstringPass() ) )
         {
            var u = keeperCheckURLsubstringUser();
            var p = keeperCheckURLsubstringPass();
            if( keeperCheckUserList(u,p) )
            {
               getIn = "yes";
               if( keeperCheckURLsubstringSave() )
               {
                  var keeperpass_expire_date = new Date();
                      keeperpass_expire_date.setTime(keeperpass_expire_date.getTime() + (1000 * 60 * 60 * 24 * 365 * 5));
                  keeperSetCookie("keeperuser", u, keeperpass_expire_date);
                  keeperSetCookie("keeperpass", p, keeperpass_expire_date);
                  keeperSetCookie("keepersave", 1, keeperpass_expire_date);
               }
               else
               {
                  keeperSetCookie("keeperuser", u);
                  keeperSetCookie("keeperpass", p);
                  keeperSetCookie("keepersave", 0);
               }
            }
         }
      }
      else
      {
         if( ( keeperGetCookie("keeperuser") ) && ( keeperGetCookie("keeperpass") ) )
         {
            var u = keeperGetCookie("keeperuser");
            var p = keeperGetCookie("keeperpass");
            if( keeperCheckUserList(u,p) )
            {
               getIn = "yes";
            }
         }
      }
   }
   else
   {
      alert("Your browser cookies are disabled. In order to gain access, you must enable them.");
   }

   if ( getIn == "no" )
   {
      location.replace(keeperaltpage);
   }
   else
   {
      if( keeperCheckURLsubstring() )
      {
         var loc = location.pathname;
         var enc = new String(kStrEncode(keeperTos(keepersp)));
         var dec = new String(kStrDecode(kStrEncode(keeperTos(keepersp))));
         var match = new RegExp(enc, 'i');
         var newloc = loc.replace(match,dec);

         loc = newloc;
         enc = new String(kStrEncode(keeperTos(kxt)));
         dec = new String(kStrDecode(kStrEncode(keeperTos(kxt))));
         match = new RegExp(enc, 'i');
         newloc = newloc.replace(match,dec);

         if(kidx.length > 0)
         {
            loc = newloc;
            enc = new String(kStrEncode(kidx));
            dec = new String(kStrDecode(kStrEncode(kidx)));
            match = new RegExp(enc, 'i');
            newloc = newloc.replace(match,dec);
         }
         location.replace(location.protocol + "//" + location.hostname + newloc);
      }
   }
}


function loadKeeperForm()
{
   if( ( keeperGetCookie("keeperuser") ) && ( keeperGetCookie("keeperpass") ) )
   {
      window.document.keeperform.keeperuser.value = keeperGetCookie("keeperuser");
      window.document.keeperform.keeperpass.value = keeperGetCookie("keeperpass");

      if( keeperGetCookie("keepersave") )
      {
         if( keeperGetCookie("keepersave") == 1 )
         {
            window.document.keeperform.keepersave.checked = true;
         }
      }
   }
}

function keeperTos(tos)
{
   for (var sot = '',i=tos.length-1;i>-1;i=i-1) { sot += tos.charAt(i); }
   return sot;
}

var kStrLetters = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D",
"E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v",
"w","x","y","z","_","-")
var kStrCodes = new Array("%30","%31","%32","%33","%34","%35","%36","%37","%38","%39",
"%41","%42","%43","%44","%45","%46","%47","%48","%49","%4a","%4b","%4c","%4d","%4e",
"%4f","%50","%51","%52","%53","%54","%55","%56","%57","%58","%59","%5a","%61","%62",
"%63","%64","%65","%66","%67","%68","%69","%6a","%6b","%6c","%6d","%6e","%6f","%70",
"%71","%72","%73","%74","%75","%76","%77","%78","%79","%7a","%5f","%2d")


function kStrEncode(kstr)
{
   var newkstr = "";
   for (var x = 0; x < kstr.length; x++)
   {
      var j = kstr.charAt(x);
      for (var i = 0; i < kStrLetters.length; i++)
      {
         if(j == kStrLetters[i]) { newkstr += kStrCodes[i]; }
      }
   }
   return newkstr;
}


function kStrDecode(kstr)
{
   var newkstr = "";
   for (var x = 0; x < kstr.length; x+=3)
   {
      var j = kstr.substring(x,x+3);
      for (var i = 0; i < kStrLetters.length; i++)
      {
         if(j == kStrCodes[i]) { newkstr += kStrLetters[i]; }
      }
   }
   return newkstr;
}

function keeperLogOut()
{
   var minusone = new Date();
   minusone.setTime(minusone.getTime() - (1000 * 60 * 60 * 24));
   keeperSetCookie("keeperuser", "", minusone );
   keeperSetCookie("keeperpass", "", minusone );
   keeperSetCookie("keepersave", 0,  minusone );
   location.href = keeperlogoutpage;
}

var kxt="lmth";var kidx="";
var kidxslsh=""; if(kidx.length > 0) { kidxslsh="/"; }

var keepersp = "terces";

/**  END OF FILE  *************/
