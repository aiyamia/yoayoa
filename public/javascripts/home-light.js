var light_app = new Vue({
  el: '#app_light',
  data: {
    input : "",
    english_sites : [{name:'',src:''}]
  },
  methods:{
    showResults(){
      if(/\w/.test(this.input)){
        console.log('输入有效');
        const input_area = document.getElementsByClassName("input_area")[0];
        input_area.style.cssText = "margin-top:2rem;margin-bottom:2rem;";
        const query_string=encodeURI(this.input);
        const url_libgen=`http://libgen.rs/search.php?req=${query_string}&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=def`;
        const url_zlib=`https://2lib.org/s/?q=${query_string}`;
        const q_string=encodeURI(`title:(${this.input}) AND mediatype:(texts)`);
        const url_archive=`https://archive.org/search.php?query=${q_string}`;
        const url_hathi=`https://catalog.hathitrust.org/Search/Home?lookfor=${query_string}&searchtype=title&ft=&setft=false`;
        const url_worldcat=`https://www.worldcat.org/search?qt=worldcat_org_all&q=${query_string}`;
        this.english_sites=[
          {name:'libgen',src:url_libgen},
          {name:'zlib',src:url_zlib},
          {name:'archive',src:url_archive},
          {name:'hathitrust',src:url_hathi},
          {name:'worldcat',src:url_worldcat}
        ]
        const tabs_bar = document.getElementsByClassName("tab")[0];
        setTimeout(function(){
          tabs_bar.firstChild.firstChild.click();
        },1000);
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
    }
  }
});