#!/usr/bin/env node
//console.log('你好!longtaoge 命令行!');


const http =require('http');
const url =require('url');
const fs =require('fs');
const path =require('path');
const args = process.argv;

console.log(args);


//默认配置
const  config={
    PROT:8080,
    basePath:process.cwd()
}


args.forEach((item,index)=>{
    if(item==='--port'){

        config.PORT=args[index+1];
    }

    if(item==='--server'){

        config.basePath=args[index+1];
    }


})


const  server= http.createServer((request,respose)=>{

        const obj=url.parse(request.url);
        console.log(config.basePath);
        console.log(obj.pathname);
          fs.readFile(path.join(config.basePath,obj.pathname),(err,data)=>{

              if(err){
                respose.writeHead(404);
                return respose.end('404 not find the file');

                }

                respose.end(data);

          });



    })


    server.listen(config.PORT,err=>{
      if(err){
      return console.log('监听出错了')
    }
        console.log('监听成功');
    })