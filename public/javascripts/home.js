
var light_app = new Vue({
  el: '#app',
  data: {
    input : "",
    english_sites : [{name:'',src:''}]
  },
  methods:{
    showResults(){
      if(/\w|[\u4e00-\u9fa5]/.test(this.input)){
        console.log('输入有效');
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        document.getElementsByClassName("info")[0].style.display="none";
        this.wink();
        const head = document.getElementsByClassName("head")[0];
        head.style.cssText = "display:flex;justify-content:center;align-items:center;";
        document.getElementsByClassName('result')[0].style.display = "block";
        const query_string=encodeURI(this.input);
        const url_libgen=`https://libgen.is/search.php?req=${query_string}&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=def`;
        const url_zlib=`https://2lib.org/s/?q=${query_string}`;
        const q_string=encodeURI(`title:(${this.input}) AND mediatype:(texts)`);
        const url_archive=`https://archive.org/search.php?query=${q_string}`;
        const url_hathi=`https://catalog.hathitrust.org/Search/Home?lookfor=${query_string}&searchtype=title&ft=&setft=false`;
        const url_worldcat=`/proxy/worldcat/search?qt=worldcat_org_all&q=${query_string}`;
        this.english_sites=[
          {name:'libgen',src:url_libgen},
          {name:'zlib',src:url_zlib},
          {name:'archive',src:url_archive},
          {name:'hathitrust',src:url_hathi},
          {name:'worldcat',src:url_worldcat}
        ]
        setTimeout(function(){
          document.getElementById("libgen_tab").click();
        },2000);
      }else{
        console.log('输入有误');
        this.input=""
        inp_ele=document.getElementById("search_txt");
        inp_ele.placeholder="请输入带文字字符的内容~"
        setTimeout(function(){
          inp_ele.placeholder="Search for title, author, ISBN, publisher, md5.."
        },1000);
      }
    },
    openSite(evt, siteName) {
      // Declare all variables
      var i, tabcontent, tablinks;
    
      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
    
      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
    
      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(siteName).style.display = "block";
      evt.currentTarget.className += " active";
    },
    wink(){
      var tohide = document.getElementsByClassName("to-hide")[0];
      if (tohide.style.maxWidth != "0px") {
        tohide.style.maxWidth = "0";
        tohide.style.padding = "0";
        const input_area = document.getElementsByClassName("input_area")[0];
        input_area.style.cssText = "margin:0;top:17vh;left:95vw;transform: rotate(-130deg);";
      } else {
        const input_area = document.getElementsByClassName("input_area")[0];
        input_area.style.cssText = "top: 45vh;left: 25vw;";
        setTimeout(function(){
          tohide.style.maxWidth = "40rem";
          tohide.style.padding = "1rem";
          const input = tohide.firstChild
          input.focus()
          input.select();
        },100);
      }
    },
    iframeLoad(siteName){
      if(siteName==="worldcat"){
        console.log('天青色等烟雨');
        // document.getElementById("#onetrust-consent-sdk").remove();
      }
    }
  }
});

