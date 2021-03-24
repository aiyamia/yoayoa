document.getElementById("search_sub").addEventListener("click", function() {
  inp_ele=document.getElementById("search_txt");
  if(/\w/.test(inp_ele.value)){
    console.log('输入有效');
    const query_string=encodeURI(inp_ele.value);
    var url=`http://libgen.rs/search.php?req=${query_string}&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=def`;
    window.open(url, '_blank').focus();
    url=`https://2lib.org/s/?q=${query_string}`;
    window.open(url, '_blank').focus();
    const q_string=encodeURI(`title:(${inp_ele.value}) AND mediatype:(texts)`);
    url=`https://archive.org/search.php?query=${q_string}`;
    window.open(url, '_blank').focus();
    url=`https://catalog.hathitrust.org/Search/Home?lookfor=${query_string}&searchtype=title&ft=&setft=false`;
    window.open(url, '_blank').focus();
    url=`https://www.worldcat.org/search?qt=worldcat_org_all&q=${query_string}`;
    window.open(url, '_blank').focus();
  }else{
    console.log('输入有误');
    inp_ele.value=""
    inp_ele.placeholder="请输入带文字字符的内容~"
    setTimeout(function(){
      inp_ele.placeholder="Search for title, author, ISBN, publisher, md5.."
    },1000);
  }
}, false);