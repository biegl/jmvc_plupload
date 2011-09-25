steal(
  'jquery',
  'jquery/controller',
  '//plupload/resources/js/jquery.plupload.queue/css/jquery.plupload.queue.css',
  '//plupload/resources/js/plupload.full.js').then(
  '//plupload/resources/js/plupload.browserplus.js').then(
  '//plupload/resources/js/jquery.plupload.queue/jquery.plupload.queue.js').then(
  function($){
    $.Controller('fileUploader',
    {},
    {
      $dropArea: null,
      
      init: function(){
        this.createContainer();
        this.createUploader();
      },
            
      createContainer: function(){
        this.$dropArea = $('<div id="container"></div>');
        this.element.append(this.$dropArea);
      },
      
      createUploader: function(){
        var self = this;
        
    	  this.uploader = this.element.find('#container').pluploadQueue({
          runtimes : 'html5,gears,flash,browserplus',
          url : 'upload.php',
          max_file_size : '10mb',
          chunk_size : '1mb',
          //unique_names : true,
          resize : {width : 800, height : 600, quality: 100 },
          multiple_queues: true,
          rename: true,
          filters : [
            {title : "Image files", extensions : "jpg,jpeg,gif,png"}
          ],
          flash_swf_url : 'resources/js/plupload.flash.swf',
          init: {
            Error: function(up, err){
              console.log(err);
            },
            UploadComplete: function(up, files){
              if(typeof(self.options.callback) !== 'undefined'){
                self.options.callback.apply(this,[up,files]);
              }
            }
          }
        });
      }
    });
});