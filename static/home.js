document.getElementById("search_sub").addEventListener("click", function() {
  inp_ele=document.getElementById("search_txt");
  if(/\w/.test(inp_ele.value)){
    console.log('输入有效');
    const url = 'http://localhost:3000/api';
    search_req(url,'worldcat');
    search_req(url,'libgen');
    search_req(url,'zlib');
  }else{
    console.log('输入有误');
    inp_ele.value=""
    inp_ele.placeholder="请输入带文字字符的内容~"
    setTimeout(function(){
      inp_ele.placeholder="Search for title, author, ISBN, publisher, md5.."
    },1000);
  }
}, false);
const search_req = (url,site_name)=>{
  var request = new Request(`${url}/${site_name}`, {
    method:"POST",
    mode: 'cors',
    headers: {
    　　'Content-Type': 'application/json'
    },
    body:JSON.stringify({
    'search' : inp_ele.value
    })
  });

  fetch(request)
  .then(res => res.json())
  .then(data=>{
    // console.log(JSON.parse(data));
    document.getElementById(`${site_name}_result`).innerHTML=`${data.html}`;
  });
};