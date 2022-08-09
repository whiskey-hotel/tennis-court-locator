# Tennis Court Locator
## Purpose:
I started this project to help identify local tennis courts in my area. Many of the known courts are private, or require some sort of membership or pay-to-play in order to gain access to the court. Every once in a while, I'll discover a tennis court I didnt know existed and they are often open to the public. These courts dont normally come up in a search engine query. 

With this project, I will be able to identify all local tennis courts without the added effort of scrolling through aerial satellite images or driving around in my car.

## Methods:
### The dataset:
The process of identifying tennis courts will require a bit of machine learning with object detection. 
To my knowledge, a dataset that includes aerial images of tennis courts does not exist, therefore, I will have to create my own.
I've identified two sources that may help with creating a dataset:
1. [Approximatley 30,000 tennis court locations throughout the US](https://data.world/mglobel/tennis-courts)
2. [Tennis court locations throughout the Washington, DC area](https://data.world/codefordc/tennis-court-sites)

With the location data, I utilized the [Google Maps static imageAPI](https://developers.google.com/maps/documentation/maps-static?csw=1) to obtain uniform PNG files of each location.

For each API call, I set the size parameter as `640x640` and the map type as `satellite`.
In order to provide variation in scale, I adjust the zoom level anywhere from `15` to `20`.

Once each file is saved to the image folder, I had to manually annotate each image with a bounding box.
The tool I chose to annotate each image with was [MakeSense.AI](https://www.makesense.ai/). 
The annotated images were exported in a .zip package containing files in the VOC XML format.

### Training the model:
In order to utilize [Tensorflow’s object detection API](https://github.com/tensorflow/models/tree/master/research/object_detection), I had to convert my annotated images into `TFRecord format`.

I generated a tf record from my XML format annotations with Tensor Flow's Object Detection [conversion script](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/using_your_own_dataset.md).

In order to use TensorFlow on my system (macOS), I had to install `Miniforge` to create a seperate environment and then follow the [TensorFlow Installation Guide](https://developer.apple.com/metal/tensorflow-plugin/) for getting setup.

I created the environment with:
~~~
    conda create --name tf python=3.9
~~~

Then I can activate and deactivate the environement with:
~~~
    conda deactivate
    conda activate tf
~~~
I had to create a label map file, `labelmap.pbtxt`, to define the classes that are going to be used. 
I only used one class, so this was a pretty simple file:
~~~
    item {
        name: "Court"
        id: 1
    }
~~~

I had to create an object detection training pipeline.