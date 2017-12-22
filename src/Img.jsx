import React, { Component } from 'react';
class Img extends Component {
  constructor(props) {
    super(props);

  }
  updateCanvas() {
    Jimp.read("test.jpg", function (err, lenna) {
    if (err) throw err;
    lenna.resize(256, 256)            // resize
         .quality(60)                 // set JPEG quality
         .greyscale()                 // set greyscale
         .write("lena-small-bw.jpg"); // save
});
  }
  render() {
    return (
      <div>
        <canvas id='viewport' ref="canvas" width={300} height={300}/>
         <button onClick={this.updateCanvas}>Submit</button>
      </div>
    );
  }
}


export default Img;
