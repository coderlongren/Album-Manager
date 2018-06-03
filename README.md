# Introduction for Album-Manager
this is my module for manager photo albums based on a directory.we assume that: 
give a path, there is an albums sub_folder, abd each od its individual sub-folders are themselves the albums. files in these sub-folers are photos.
## Album-Manager 
The album manager exposes a single function : "albums" which returns an array of "albums" objects for each album it contains.
## Albums Object
The Album object has the following two properties  and one method:
* `/v1/albums.json` --> get all of the albums.
* `/v1/albums/:album_name.json` --> get one of the album.
* `/pages/:page_name` --> Calling this method will return all the album's photos.
## How to use
`clone the respository`    	
`cd Album-Manager`   
`npm install --save`  
`node server.js`  
welcome to star the Album-Manager.  
如果喜欢，欢迎star这个项目。
