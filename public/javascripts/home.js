
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
        ];
        setTimeout(function(){
          document.getElementById("worldcat_tab").click();
        },2000);
      }else{
        console.log('输入有误');
        this.input=""
        inp_ele=document.getElementById("search_txt");
        inp_ele.placeholder="请输入带文字字符的内容~"
        setTimeout(function(){
          inp_ele.placeholder="Search for title"
        },1000);
      }
    },
    openSite(evt, siteName) {
      var i, tabcontent, tablinks;
    
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

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
        const max_width_of_hide = getComputedStyle(tohide).getPropertyValue('--max-width-of-hide');
        const padding_hide = getComputedStyle(tohide).getPropertyValue('--padding-hide');
        const input_area = document.getElementsByClassName("input_area")[0];
        const top_input_area = getComputedStyle(input_area).getPropertyValue('--top-input_area');
        const left_input_area = getComputedStyle(input_area).getPropertyValue('--left-input_area');
        input_area.style.cssText = `top: ${top_input_area};left: ${left_input_area};`;
        setTimeout(function(){
          tohide.style.maxWidth = max_width_of_hide;
          tohide.style.padding = padding_hide;
          const input = tohide.firstChild
          input.focus()
          input.select();
        },100);
      }
    }
  }
});
