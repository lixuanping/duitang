export function selectFile(val){
    console.log(111)
    var form = new FormData();//通过HTML表单创建FormData对象
    var files = val;
    console.log(files[0]);
    if(files.length == 0){
        return;
    }
    var file = files[0];
    //把上传的图片显示出来
    var reader = new FileReader();
    // 将文件以Data URL形式进行读入页面
    reader.readAsBinaryString(file);
    reader.onload = function(f){
        //var result = document.getElementById("result");
        var src = "data:" + file.type + ";base64," + window.btoa(this.result);
        //result.innerHTML = '<img src ="'+src+'"/>';
        return src;
    }
    // console.log('file',file);
    // form.append('file',file);
    // console.log(form.get('file'));
}
