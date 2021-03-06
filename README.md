CodingChallenge
===============

PDF to PNG file uploader

This is a wrapper for the ImageMagick module that converts PDFs to PNGs. The wrapper, which is found in node_modules/imageConverter, contains one method -- convert -- which takes an input directory file and an output directory where each single page is converted to a separate png and its path to access it is returned in an array. The api route /create will then call this method when it receives all of a PDF and then return a dictionary that maps file name to image url directory.

## Table of Contents

- [How to Run]
- [How to Upload Files]
- [Output]
## How to run 

  a.    Install imageMagick at http://www.imagemagick.org
    for Mac you can type "brew install imagemagick" if you have brew installed.

  b.  pdf conversion requires ghostscript. you can download this at http://www.ghostscript.com/ 
      or type in "brew install ghostscript"
      
  c.  node ./index.js
  
  d.  Server is now running!
  

## How to upload files to the server  ##

  a.  Endpoint is at /create. To upload a file, you must send a file using a POST request, putting the file as a header under         "upload".
  
  b.  An example CURL is curl -i -F upload=@[FILE] localhost:8000/create.
  
  c.  If running this on a remote server, the localhost:8000 part will change.

## Output  ##

  a.  The file conversion will start as soon as the file is uploaded. If the file is not a PDF, the conversion will stop        immediately and the user will receive an empty array, signifying that no files were uploaded because of bad format or that there are no pages in the PDF.
  
  b.  If there is a good conversion, the uploaded file will remain in the "/uploads" folder with the original name intact, while the converted files will be placed in the "/images" folder with the format NAME_thumbnail_page_X.png.
  
  c. The endpoint to receive images will be provided in the API, but they can be accessed using the "/images/FILENAME_thumbnail_page_X.png" endpoint.

