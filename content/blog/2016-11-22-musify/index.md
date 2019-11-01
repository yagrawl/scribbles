---
title: Musify
date: "2016-11-22"
time: "3 mins"
description: CLI tool that recognises the mood of the video to find appropriate background score.
category: Projects
tags: Web Application, Clarifai
---

This is a project that me and a couple other people worked on at WildHacks 2016, Northwestern University. We decided to go for 'The best use of Clarifai's API' and went through a few ideas before finalizing one. The basic idea of our project was to provide background music for videos. Quite simply the videos would be passed through our own custom trained Clarifai agent and decide on a mood. Clarifai is an Artificial Intelligence with a Vision. Basically it's an image and video recognition API. We decided to work with a custom model and trained it on the images we scraped using Pixabay. We landed upon 4 different categories for the video emotions - Action, Sad, Happy, Calm.

## Setup

![Pixabay](./image1.png)

We obviously needed to train our agent on a huge dataset. Now this being a hackathon project, we needed to do it quickly. Scraping a free stock photo website seemed like the way to go. Since the entire project was in python, I used BeautifulSoup to scrape and download all the images in categories such as action, sad, happy and calm off of Pixabay. We later uploaded this to our custom agent on Clarifai. After uploading upwards of 1000 images in each category, our agent started giving out stable responses.

![Clarifai](./image2.png)

## Implementation

One quick glance at the code for the main file of our code makes it crystal clear that this was a hackathon project. We used a bunch of python libraries as we required. For example, we used pydub to manipulate sound according to video specifications.

Finally one of the main aspect of our project was to actually find the music suited to our project. We obviously didn't have enough time nor the skills to come up with a machine learning to actually make music on the fly so we relied on JukeDeck's music library. JukeDeck had an abudance of pre-made music on their site sorted by similar titles as we had originally decided on. We built our own database and used that to add it to our videos. JukeDeck doesn't have a public API at the moment so we emailed the people there but since it was a weekend, we didn't hear back from them.

![Jukedeck](./image3.png)

## Result

Before :

`youtube:https://www.youtube.com/embed/Yq2-oM5AkEU`

After :

`youtube:https://www.youtube.com/embed/8kGR5jMhrDo`

## What's Next?

We also tried to design a proper front-end for the client side of the app but we didn't have enough time so we just submitted it as a command line interface.

![Frontend](./image4.png)

I'm looking to make this into a fully functional webapp with more tags for videos and proper jukeDeck integration. Meanwhile try out the project below.

## Try it out

[Github](https://github.com/yagrawl/wildhacks2016)  
[Clarifai Blog](http://blog.clarifai.com/clarifai-featured-hack-musify-finds-the-perfect-background-music-for-your-videos/)  
[Devpost](https://devpost.com/software/musify-gr1zj6)  
