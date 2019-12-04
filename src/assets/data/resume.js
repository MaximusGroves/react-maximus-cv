export const TOP_BAR_HEIGHT = 64;
export const TOP_BAR_HEIGHT_SM = 60;
export const BOTTOM_BAR_HEIGHT = 71;

export const RESUME_PROFILE = {
  name: 'Maximus Groves',
  tagline: '10 years experience in software development and digital marketing as a UX Engineer and entrepreneur'
};

export const RESUME_EDUCATION = {
  college: 'Georgia Tech',
  graduation: '2011',
  degree: 'B.S. in Computational Media'
};

export const RESUME_FAVORITES = [
    "80:",
    "77:",
    "55:",
    "52:",
    "47:",
    "46:",
    "35:",
    "27:",
    "21:",
    "2:"
];

export const RESUME_SITECONTENT = {

  coverTab: {
        coverLetter: {
          title: 'Welcome',
          description: 'Thank you for visiting my website.',
          repo: 'https://github.com/MaximusGroves/react-maximus-cv',
          repoHost: 'GitHub',
          body: [
            'This site began as a simple project to better familiarize myself with the ReactJS build process using webpack. That expanded to become a resume/portfolio with a personalized theme using the material-ui component library and very little boilerplate code.',
            'I sought to use external apis to gather my published material across other media and display them as a showcase of my software skills in synthesis with other talents.',
            'This is a static, single-page, ReactJS project with a serverless backend. It implements the react-spring library to create a custom swipeable views component with parallax effect in two dimensions. This is hosted by Netlify implementing their AWS Lambda functions for a restful API, environment variables, and CORS compliance with external APIs. The DNS is maintained by CloudFlare and static images are optimized and cached by Cloudinary.',
            'My current effort is to convert this page into a static site theme for GatsbyJS and to implement it and a serverless CMS into the stack.',
            "I'm currently seeking employment as a full-time, front-end, ReactJS developer."
          ]
        },
        aboutMe: {
          title: 'About Me',
          description: [
            "I've shifted through various phases of my professional life by working for large corporations, lean start-ups, and myself. I've compiled samples of my work across all media here for your evaluation and enjoyment.",
            "I'm currently seeking employment as a full-time, front-end, ReactJS developer."
          ]
        },
        toDo: {
          title: 'ToDo:',
          description: [
            'Connects to an Atlas MongoDB cluster to create, read, update, and delete items in my ToDo list.',
            "You're welcome to add your own items and/or vandalize this list"
          ]
        }
      },

      careerTab: {
        experience: {
          title: 'Experience',
          description: 'My history of employment',
          list: [
            {
              employer: 'Merged RE',
              title: 'Senior Front-End Developer',
              range: 'Oct 2018 - Now',
              startDate: 'Oct 2018',
              endDate: 'now',
              logo: ['img/logomerged.png'],
              description: [
                'Merged is a new product designed from the ground up to implement modern technology stacks and user experience design into the real estate sales process, making it a seamless experience that augments the natural talents of the realtor while giving them full control over their data. Since late 2018 I have been the lead front-end developer preparing this cutting-edge product for their coming disruption of the market. Merged is a ReactJS application extending the material-ui component library.'
              ]
            },

            {
              employer: 'My Blockchain Coach / Blockchain Ecosystem Advisors',
              title: 'Digital Media Consultant',
              range: 'May 2018 - Oct 2018',
              startDate: 'May 2018',
              endDate: 'Oct 2018',
              logo: ['img/logombc.png', 'img/logobea.png'],
              description: [
                'My Blockchain Coach started as a partnership between fulltime cryptocurrency traders to offer an immersive, subscription-based community with detailed documentation and hands-on training for aspring crypto enthusiasts located in the Atlanta Tech Village. I came on as their first employee to plan their media efforts through podcasting and advertising and to complete their website design and implementation. Around when I started, the crypto market suffered a major decline and we shifted the business from consumer training into b2b consultations. During this time I led a full rebranding of our client Javvy leading up to their initial token offering. We created a new company logo, token logo, copywrote a new whitepaper from the technical specs, designed and implemented a new website, wrote and managed press releases, wrote a radio advertisement aired by iHeartRadio, and aided with social media consultants, ultimately producing a successful $7mm raise.',
                "During the transition to b2b, new partnerships were formed to start a new company with business consultation as the primary focus called Blockchain Ecosystem Advisors. I started again from scratch in creating new logos, slogans, websites, and social media. In this phase I continued working with Javvy as they neared their ITO. I also consulted with financial startup Atlantide Capital Partners who sought to open hudgefund investment to a mass market with a Reg A+ offering and to issue certificates with a cryptocurrency security token that would become liquidity in an exchange market, simplifying fund members' exit strategy. I again created websites, logos, technical documents, and investor documents, whatever was needed at the time. I also wrote a proposal document to the government of Angola pitching BEA to be the project manager for their new paperless business compliance network relying on blockchain technology."
              ]
            },

            {
              employer: 'Sideways 8',
              title: 'Theme Developer',
              range: 'Apr 2017 - Apr 2018',
              startDate: 'Apr 2017',
              endDate: 'Apr 2018',
              logo: ['img/logos8.png'],
              description: [
                "Sideways 8 is a lean digital marketing agency serving 100's of clients across the globe with many coming from the Atlanta area. I joined the team as a contractor to maintain existing site-builds and implement several designs from scratch using their proprietary boilerplate extending the WordPress platform. In special cases I created custom solutions through modern javascript frameworks such as VueJS. Some notable subcontracted projects are listed in the section below."
              ]
            },

            {
              employer: 'Corporation 1729',
              title: 'Director',
              range: 'Jan 2016 - Mar 2017',
              startDate: 'Jan 2016',
              endDate: 'Mar 2017',
              logo: ['img/logomerged.png'],
              description: [
                "For Corporation 1729 I partnered with trusted colleagues to offer novel solutions to modern software challenges. We pivoted into several areas to accommodate each prospective clients' needs. My responsibilities shifted daily between sales, project management, recruiting, accounting, and graphic design. This was my first entry into entrepreneurship and we dissolved after it became more efficient for each partner to accept full-time work elsewhere. 1729 is a reference to indian mathematician Srinivasa Ramanujan who casually observed that it was the smallest number expressible as the sum of two cubes in two different ways. 1729 = 1^3 + 12^3 = 9^3 + 10^3"
              ]
            },

            {
              employer: 'PGi',
              title: 'iMeet Web Client Developer',
              range: 'Nov 2011 - Oct 2015',
              startDate: 'Nov 2011',
              endDate: 'Oct 2015',
              description: [
                "iMeet is a web conferencing and collaboration tool committed to enhancing the remote sales experience. I joined early in the product's evolution taking it from a startup project into a competitior in the web conferencing arena. I focused heavily on the user experience and collaboration tools delivering streaming media,  white-boarding, screen-share, and video conferencing with sleek animations and an intuitive feature set. We coordinated with teams locally and abroad to deliver a fully featured technology stack that serves clients worldwide."
              ]
            },
            {
              employer: 'Pic Inc.',
              title: 'Animation Developer',
              range: '2009 - 2011',
              startDate: '2009',
              endDate: '2011',
              description: [
                "With Pic I started as an animator contracted to convert stylized P&ID diagrams for Southern Company's power plants into interactive training modules summarizing the operation of the plant. I took on the added responsibility of developing the front-end client delivering the animations as well. I also created a standardized animation library for material flowing through the plant that remained their primary tool years after I had left."
              ]
            }
          ]
        },
        clients: {
          title: 'Past Work',
          description:
            "A collection of notable projects and clients from the past. I'm listing both direct contracts and work subcontracted through past employers.",
          lists: [
            {
              title: 'From Scratch',
              description:
                'These projects either began as brand new builds or were developed full time',
              list: [
                {
                  client: 'Javvy',
                  url: 'https://javvy.com/',
                  description:
                    'For Javvy we performed a full rebranding of their company identity. I worked personally on the redesign of the company logo, redesign of the token logo, redesign and implementation of the website, writing a new whitepaper, writing and managing  press releases, writing a radio advertisement campaign on iHeartRadio, and coordinating with social media consultants.'
                },
                {
                  client: 'Conifgero',
                  url: 'https://www.configero.com/',
                  description:
                    'Configero is a client of Sideways8. I was assigned to build a new WordPress theme from scratch using Sideways8\'s proprietary boilerplate and implementing their design. Part of the build was a pretty slick javascript app filtering their catalog of <a target="_blank" href="https://www.configero.com/solutions-showcase/">Solutions Showcases</a>.'
                },
                {
                  client: 'iMeet',
                  url: 'http://www.imeet.com/',
                  description:
                    "iMeet is a web conferencing and collaboration tool that served as the top-shelf product for PGi. It prioritizes user experience and offers a rich set of features for collaboration. I joined early in the process of scaling it from a start-up project into a competitive business application. For 5 years I worked full-time on the web client taking it from its early life under a small team into a much larger one coordinated across several cities. It is now merged into PGi's other conferencing product GlobalMeet."
                },
                {
                  client: 'Side of Epic',
                  url: 'https://www.sideofepic.com/',
                  description:
                    'Side of Epic is my online store selling snarky merchandise. I created an extension of the default Shopify theme to implement custom style updates as well as all of the site\'s media and products. It interfaces with Printful to perform on-demand printing and shipping for automated, zero-inventory retail. "Err on the side of EPIC."'
                },
                {
                  client: 'AIMA',
                  url: 'http://www.atlantaima.org/',
                  description:
                    'AIMA is a client of Sideways8. I was assigned to perfectly recreate their existing site under a different CMS as a WordPress theme. I also implemented a custom integration with the Eventbrite api to manage and promote their events.'
                },
                {
                  client: 'Comcastro',
                  url: 'http://www.comcastro.com/',
                  description:
                    'My blog and podcast. I designed the logo and site and built it using a commercial WordPress theme. More details in the "COMEDY" tab. '
                },
                {
                  client: 'Atlantide Capital Partners, Inc',
                  url: 'Company Dissolved',
                  description:
                    'I performed all the media production for this financial startup as they sought investment and lobbied for crypto policy with the SEC. I designed and implemented their website, logo, technical and investor documents, and miscellaneous other needs.'
                }
              ]
            },

            {
              title: 'Maintenance',
              description:
                "Other websites I've contributed to as a developer",
              list: [
                {
                  client: 'Wingz',
                  url: 'https://www.wingz.me/',
                  description:
                    'Client of Sideways8. Completed a VueJS widget implementing a Google Places autocomplete feature for booking a private driver through the client\'s ridesharing api and implemented it into a new page template for  <a target="_blank" href="https://www.wingz.me/airport/sea/">individual airport branding</a>.'
                },
                {
                  client: 'TYFNI Beauty',
                  url: 'https://www.tyfnibeauty.com/',
                  description:
                    'Created media for their website, training materials, and advertising.'
                },
                {
                  client: 'Mirasco',
                  url: 'https://mirasco.com/',
                  description: 'Client of Sideways8'
                },

                {
                  client: 'Local 342',
                  url: 'https://local342update.com/',
                  description:
                    'Client of Sideways8. Required some novel features for member management and compliance.'
                },
                {
                  client: 'Alpha Gamma Delta',
                  url: 'https://alphagammadelta.org/',
                  description: 'Client of Sideways8'
                },
                {
                  client: 'Turner 5K',
                  url: 'http://turner5k.com/',
                  description: 'Client of Sideways8'
                },
                {
                  client: 'Arts Bridge',
                  url: 'https://artsbridgega.org/',
                  description: 'Client of Sideways8'
                },
                {
                  client: 'MeDecision',
                  url: 'http://www.medecision.com/',
                  description: 'Client of Sideways8'
                },
                {
                  client: 'Childrens Museum Atlanta',
                  url: 'http://childrensmuseumatlanta.org/',
                  description: 'Client of Sideways8'
                },
                {
                  client: 'Nutritionally Yours',
                  url: 'https://nutritionallyyours.net/',
                  description: 'Client of Sideways8'
                },
                {
                  client: 'Atlanta Brewing Co',
                  url: 'https://atlantabrewing.com/',
                  description:
                    'My first actual client. I completed and maintained their website while in college when it was entirely a .fla project coded in the timeline. I was paid in cash and free brewery tours.'
                },
                {
                  client: 'Sai Surrealia',
                  url: 'Website Down',
                  description:
                    'Created a promotional page for the release of EDM artist Sai Surrealia\'s album "Stereo Fantastic"'
                }
              ]
            }
          ]
        },
        animations: {
          title: 'Animation Demos',
          description:
            'These are some sample animations I created of my podcast\'s logo using the <a href="https://www.framer.com/" target="_blank">Framer</a> prototyping tool. At the time there wasn\'t a Framer GUI for windows so these are compiled CoffeeScript functions, the source of which is <a href="https://github.com/ComcastroMax/logoTweens" target="_target">here</a>. View all six together <a href="/animations/" target="_blank" >here</a>.',
          choices: [
            'spin',
            'eat',
            'radar',
            'headbang',
            'earthquake',
            'focus'
          ]
        }
      },

      comedyTab: {
        standup: {
          title: 'Stand-up',
          description:
            'Most of my material was written for vulgar, late-night clubs, so most of it will only be shared in vulgar, late night clubs, but there is at least one clean set on record.'
        },
        improv: {
          title: 'Improv',
          description:
            "I've completed Improv Training levels 1-4 with Dad's Garage and performed in various troupes including several showings of an improvized musical parody of Friday the 13th where I starred as the killer Jason Vorhees"
        },
        writing: {
          title: 'Writing',
          description:
            'This is a collection of my writing pulled from the Medium.com rss feed. Several of these are from 1-off comedy shows where we wrote and performed parody roasts of existing characters.'
        },
        podcasts: {
          title: 'Podcasts',
          description:
            'Comcastro is my geek culture podcast and was my first outing in professional media. Intelligent, irreverant, funny, and philosophical. This list is generated from the rss feed published by my provider.'
        }
      },

      commerceTab: {
        pitch: {
          description:
            'Side of Epic is my merchandise store to "provide clothing and gear for contrarian virtue signaling."',
          slogan: '"That\'s our grift to you."',
          detailed:
            'I wanted to experiment with the Shopify Storefront Api and reskinned their components to interface with my own account.'
        }
      }
};

