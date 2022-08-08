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

With the location data, I wrote a python script that will:
- go to each coordinate location at a specific elevation, 
- capture a screenshot,
- and save the file to a test folder as a .png file 

Once each file is saved to the test folder, I had to manually annotate each image with a bounding box.
The tool I chose to annotate each image with was [Scalable](https://scalabel.ai/).

### Training the model:
