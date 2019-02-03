---
title: What is React?
date: '2019-02-01'
---
When it comes to the way we talk about Front-end, React seems to be a commonly misunderstood term. What exactly are we talking about, when we talk about React? 

If you've ever come across the acronym MVC (or Model-View-Controller), you'll know it's an approach to software architecture where there are three distinct layers. Typically, a user will "see" the View layer (or User Interface). When they interact with an app, this uses the Controller layer to interpret actions and behaviour. The Controller then updates the Model, which returns back to the View layer to provide feedback to the user.

The Model is where we usually interact with our data - this could be a database, or a bunch of APIs. In our Controller layer, we'll store methods for manipulating or responding to this data. 

So where does React fit into this? React is an approach to building User Interfaces by creating a series of modular components. It's not just the component approach which sets React apart. React also has something we call lifecycle, that is, each component can be built to automatically trigger certain events based on changes in data.

React also introduces us to an entirely new language known as JSX. JSX simply allows us to write HTML, or template tags, within JavaScript. The power of this approach is that it allows us to tightly couple our UI logic (changes in data, user interaction) with our rendering so that we have a truly dynamic view layer.  React separates concerns within our files rather than the files themselves.

React is only really designed to function within the View layer of our app. Typically, React apps have what we call Middleware. For JavaScript based applications, our middleware is the logic that sits between the React view layer and the data sources, whether they be APIs or a database. Typically, middleware for React applications runs off a Node.js Server. Node.js is a technology which allows us to write JavaScript which functions more like a back end, and instead of running within your browser, runs on a server in the background.

We might also have other technologies within our application to perform other roles. For example, Redux is commonly used as a method of sharing data from our middleware between our React components and across the application as a whole. More recently, we have seen a move towards Apollo GraphQL technology, which allows us to integrate multiple data sources into a single, uniform schema.

So, to summarise, React is a technology for handling the View layer (or UI) of an application. It is only one part of a wider group of technologies we commonly bring together to build dynamic web applications, which we commonly refer to as SPAs (or Single-page Applications). It's always good to understand this as it helps us better appreciate not only what React, but not take away from the vital role the other technologies play in supporting React-based development.
