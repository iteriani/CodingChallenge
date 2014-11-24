CodingChallenge
===============

PDF to PNG file uploader


## How to run ##

  a.    Install imageMagick at http://www.imagemagick.org
    for Mac you can type "brew install imagemagick" if you have brew installed.

  b.  pdf conversion requires ghostscript. you can download this at http://www.ghostscript.com/ 
      or type in "brew install ghostscript"
      
  c.  node ./index.js
  
  d.  Server is now running!
  

## How to upload files to the server  ##

  a.  Endpoint is at /create. To upload a file, you must send a file using a POST request, putting the file as a header under         "upload".
  
  b.  An example CURL is "curl -i -F upload=@[FILE] localhost:8000/create.
  
  c.  If running this on a remote server, the localhost:8000 part will change.

## Output  ##

  a.  The file conversion will start as soon as the file is uploaded. If the file is not a PDF, the conversion will stop        immediately and the user will receive an empty array, signifying that no files were uploaded because of bad format or that there are no pages in the PDF.
  
  b.  If there is a good conversion, the uploaded file will remain in the /uploads folder with the original name intact, while the converted files will be placed in the /images folder with the format NAME_thumbnail_page_X.png.
