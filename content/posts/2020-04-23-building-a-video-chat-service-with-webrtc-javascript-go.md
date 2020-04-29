---
template: post
title: 'Building a video chat service with WebRTC, Javascript & Go'
slug: building-video-chat-app
draft: true
date: 2020-04-23T06:02:19.752Z
description: >-
  I've been itching to learn some new tech and build something exciting for a
  while now. In this series, I'll be writing a video chat application from
  scratch and learning Go along the way.
category: code
tags:
  - code
---
# Post 01 - Building a video chat application from scratch. With WebRTC, Socket IO, NodeJS & Svelte.

*Part one of many.*

I was recently on a group Zoom call with some people from the United States. Even with my usually decent home wifi connection, I had a horrible experience with frequent disconnects, audio packet loss and choppy video streaming. It got me thinking about how Zoom and similar services are architected. I figured there's no better way to learn than to just jump right down the rabbit hole and build my own video chat app.

After some research on the topic, I found [https://webrtc.org/](https://webrtc.org/) **.** WebRTC is marketed as "An open framework for the web that enables Real-Time Communications (RTC) capabilities in the browser". The project is open-source and supported by Apple, Google, Microsoft and Mozilla, amongst others. Sounded right up my alley. So I ran through the official getting started guide and samples and was hooked instantly.

*I'm almost certain Zoom, Hangouts, Skype and others have their own proprietary implementations and services that may or may not be built on WebRTC but my goal here is to learn more about real time media communications and WebRTC seemed like a great place to start.*

Of course, WebRTC is not the only technology to build a video chat app on but it has the following going for it:

- Open source
- Runs in the browser
- Vibrant community
- Enables peer to peer media communications (potentially no middle man and totally private video calls)

**Signaling**

I learnt that although WebRTC enables peer to peer communication, WebRTC in the *real world* still needs servers for peers to both discover each other and also to cope with NATs and firewalls.

So what is signaling? Signaling provides means for clients to set up their session and exchange required network data in order to facilitate the real time communication between peers.

WebRTC itself provides no implementation / API for this and it must be implemented at an application level. This gives developers the freedom to write their own signalling implementation on whichever stack / protocol they decide is best for their application.

Some implementations include the use of long polling techniques and web sockets. I decided use SocketIO in this example because I have some past experience implementing SocketIO servers.

**Where does Svelte fit into this?**

I figured a video conferencing client would require a fair amount of Javascript to wire up the UI and managing state in a multi party video call, could become tricky in vanilla JS. So I starting thinking about Javascript frameworks. 

Svelte is a framework I've been meaning to try and a web based video chat client felt like the perfect use case. So I decided to give it a go. Svelte introduces a new way of thinking about Javascript frameworks. Instead of shipping a (relatively) heavy runtime dependency to the browser (React, Angular, Vue) Svelte introduced a compile step, that packages only the parts of the framework required by the application at runtime. Meaning, significantly smaller bundle sizes while still providing a great developer experience.

Anyway, enough background. Here's some of the steps I took and some important code snippets from v1 of the video chat app:

First step was to setup a basic server to serve my Svelte webclient, landing page and SocketIO signalling implementation. I'm a long time NodeJS user, so quickly spun up a basic Koa server. 

I forked the popular [https://github.com/sveltejs/template](https://github.com/sveltejs/template) and mounted the Svelte client app using koa-mount. This meant I was now serving the compiled svelte application from my Koa server:

<script src="https://gist.github.com/MatthewMarkgraaff/d8175e33f0509b9b81fc81e7cb87d38f.js"></script>

Next, I needed to ask permission to use the user's video and audio devices. Both of which are then made available as media streams and can be associated with a video element:

<insert code block>

Next, time to stream video with the RTCPeerConnection API.

**RTCPeerConnection**

To create a connection between peers, WebRTC exposes an RTCPeerConnection API. This API is used to gather information on local media and network availability.  Once RTCPeerConnection has what it needs, it is passed on to the peer (other client) through the signaling server.

Setting up a call requires three steps:

1. Create an RTCPeerConnection on each side of the call
2. Gather ICE candidate information. This represents potential connection addresses and network details
3. Get and share local / remote descriptions in SDP format.

I created the peer connection objects and attach state change listeners like so: 

<code>

Then the local media stream is attached to the local connection.

<code>

Then, through the use of the signaling server, the local caller sends a message containing candidate data to the other peer:

<code>

Once received, an ICE candidate is added to the remote peer description:

<code>

Once network compatability is established, it's time to exchange audio and video media detail. This is achieved through an offer/answer mechanism and wraps the Session Description Protocol (SDP).

Here's a basic implementation:

<code>

**Signaling server implementation**

I wrote a basic Koa (NodeJS) / socketIO server to handle all message signalling. Here is the SocketIO implementation:

<code>

Here's the basic landing page I put together:

<screenshot>

and voila! A working (super basic) video chat application in the browser!

<screenshot>

I find peer to peer communications especially facinating after this dive into WebRTC and will no doubt be continuing my journey down the rabbit hole! Until next time..

All of the code is available here: [https://github.com/MatthewMarkgraaff/vidchat](https://github.com/MatthewMarkgraaff/vidchat)

Bear in mind, the compiled svelte app has been (lazily) committed to the repo. I just haven't gotten to adding the svelte compile step to the Heroku build yet.
