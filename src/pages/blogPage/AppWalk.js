import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { Row, Col } from "antd";
import "./Blog.scss";

export default class AppWalk extends Component {
  componentDidMount = () => {
    let token = localStorage.getItem("ACCESS_TOKEN");
    // console.log("token", token);
    if (token) {
      let userInfo = jwtDecode(token);
      console.log("userInfo", userInfo);
      if (userInfo.role === 'ADMIN') {
        this.props.history.push("/home");
      }
    }
  };
  render() {
    return (
      <>
        <br />
        <Row
          type="flex"
          justify="center"
          justifyContent="space-around"
          margin="20%"
        >
          <h1>
            These 9 Great Dog Walking Apps
          </h1>
        </Row>
        <br />
        <Row
          type="flex"
          justify="center"
          justifyContent="space-around"
          margin="20%"
        >
          <img
            alt="ipet"
            className="class-img-blog"
            src="https://cdn.kinsights.com/cache/8b/43/8b43622c95f41d3148632e53a72345a0.jpg"
          />
        </Row>
        <br />
        <Row
          type="flex"
          justify="center"
          justifyContent="space-around"
          margin="20%"
        >
          <Col xs={20} lg={10}>
            <p>
              Tracking workouts through apps and wearable fitness devices is one
              of the biggest trends to hit the exercise world -- and now it’s
              gone to the dogs, thanks to the popularity of walking apps.
            </p>
            <p>
              Dog owners can keep track of their daily strolls with man’s best
              friend, including routes, calories burned, heart rates, and more,
              by downloading a walking app to their phone. A{" "}
              <a
                href="https://bmcpublichealth.biomedcentral.com/articles/10.1186/s12889-017-4422-5"
                rel="nofollow"
              >
                recent study
              </a>{" "}
              found that dog owners walk an average of 22 minutes more per day,
              so if you’re already tracking your routine gym workout, why not
              log those extra minutes spent with your pooch, too?
            </p>
            <p>
              If you normally hire a dog walker, check with them to see if they
              use any apps to track their routine walks with your pup. If they
              don’t, take a look at the list of apps below—most of which have an
              average user rating of 4.0/5 or higher—and recommend a couple!
              This could be another fun way to keep track of all the walks your
              dog goes on and maybe even find some trails and familiar smells to
              revisit together.
            </p>
            <p>
              Here are the nine best walking apps for dog owners to enjoy with
              their furry friends!
            </p>
            <p>
              <em>
                Want someone to take your doggo for a stroll while you're at
                work?{" "}
                <a href="http://www.care.com/dog-walkers">
                  Hire a dog walker near you
                </a>
                .{" "}
              </em>
            </p>
            <h2>
              <b>
                1. Map My Walk by Under Armour (
                <a
                  href="https://itunes.apple.com/us/app/map-my-walk-by-under-armour/id307861492?mt=8"
                  rel="nofollow"
                >
                  iOS
                </a>{" "}
                and{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.mapmywalk.android2"
                  rel="nofollow"
                >
                  Android
                </a>
                )
              </b>
            </h2>
            <p>
              <b>Cost: </b>Free | Offers in-app purchases starting at $5.99
              <br />
              <b>iTunes App Store customer rating: </b>4.8/5<b> </b>
              <br />
              <b>Google Play Store customer rating: </b>4.5/5
              <br />
              <b>What to know: </b>Track workouts using GPS. Share progress with
              other users. Logs your pace, route, distance, calories, and
              elevation.
            </p>
            <p>
              Walking around the neighborhood with your pooch? Checking out a
              new park? This app tracks your path using GPS and lets you view
              your route after. Map My Walk also lets you share your route on
              social media, suggests new and nearby walking paths, as well as
              saves the route to your account in case you and your dog ever want
              to revisit it.
            </p>
            <p>
              <em>
                “...enables me to keep track of all my walks, the distances that
                I walk, and all pertinent to statistics, particular variances in
                pace, and elevation changes. I would wholeheartedly recommend
                this product, especially for someone committing to daily walks
                for improving cardiovascular and overall health.”
              </em>{" "}
              – RC Anthony, iTunes user review
            </p>
            <p>
              <em>
                “Great motivating tool, with accurate mapping! This is a
                must-have, for those walking anywhere!”
              </em>{" "}
              – Craig Takata, Google Play user review
            </p>
            <h2>
              <b>
                2. Walkmeter Walking &amp; Hiking GPS (
                <a
                  href="https://itunes.apple.com/us/app/walkmeter-gps-pedometer-walking-running-hiking/id330594424?mt=8"
                  rel="nofollow"
                >
                  iOS
                </a>{" "}
                and{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.abvio.meter.walk"
                  rel="nofollow"
                >
                  Android
                </a>
                )
              </b>
            </h2>
            <p>
              <b>Cost: </b>Free | Offers in-app purchases
              <br />
              <b>iTunes App Store customer rating: </b>4.4/5
              <br />
              <b>Google Play Store customer rating: </b>3.8/5
              <br />
              <b>What to know: </b>Has customizable training plans. Creates
              tables and charts based on completed workouts. Good for hikers.
            </p>
            <p>
              If you live in a mountainous area and like to bring your dog with
              you on your outdoor adventures, then this app is for you. The New
              York Times called the app “clean, easy to use,” so it’s no
              surprise it’s one of the top choices for walking apps. The app
              allows you to view all types of terrain and traffic maps, tracks
              and logs walks and other activities, and gives you vital
              statistics.
            </p>
            <p>
              <em>
                “The app does everything I could want, it tracks my hikes,
                records the miles, the climbs, my heart rate and feeds all the
                data back to me, it graphs, maps and charts.”
              </em>{" "}
              - NoCanSurf, iTunes user review
            </p>
            <p>
              <em>“...the routes and distances recorded are perfect.”</em> - A
              Chipoletti, Google Play user review
            </p>
            <h2>
              <b>
                3. Motion X GPS (
                <a
                  href="https://itunes.apple.com/us/app/motionx-gps/id299949744?mt=8"
                  rel="nofollow"
                >
                  iOS
                </a>
                )
              </b>
            </h2>
            <p>
              <b>Cost: </b>$1.99
              <br />
              <b>iTunes App Store customer rating: </b>4.4/5
              <br />
              <b>What to know: </b>Rated best outdoor app by{" "}
              <a href="http://About.com" rel="nofollow">
                About.com
              </a>
              . Unlimited map downloading. Share your location in real time.
            </p>
            <p>
              This is another good app for those who like to take their pups on
              hiking trails. Motion X GPS lets users save previous routes or
              import new ones, and it offers 14 different map types to help you
              easily manage traffic, terrain, weather, and more. In addition,
              the app gives you the capability to share your location while
              you’re out walking or hiking with your dog, so others can follow
              along and maybe even try out your route.
            </p>
            <p>
              <em>
                “The price for the app is a bargain for the functionality. I
                recommend this without reservation.”{" "}
              </em>
              - 904Z, iTunes user review
            </p>
            <p>
              <em>
                “Motion X, in my opinion, is the best available for the iPhone.”
              </em>{" "}
              - Smd11873, iTunes user review
            </p>
            <h2>
              <b>
                4. Pedometer (
                <a
                  href="https://play.google.com/store/apps/details?id=com.tayu.tau.pedometer&amp;hl=en"
                  rel="nofollow"
                >
                  Android
                </a>
                )
              </b>
            </h2>
            <p>
              <b>Cost: </b>Free | Offers in-app purchases
              <br />
              <b>Google Play Store customer rating: </b>4.4/5
              <br />
              <b>What to know: </b>Logs daily steps. Does not track routes.
              Records distance walked and calories burned.
            </p>
            <p>
              While this app does not map out your walking route, it does let
              you keep track of your fitness by logging the number of steps
              you’ve taken, distance walked, calories burned, and your speed.
              Your exercise data is saved to the app so you can keep tabs on
              your daily, weekly, and monthly walks. If you and your pooch enjoy
              the same leisurely walk each day, this app is for you!
            </p>
            <p>
              <em>
                “Superb app. I have absolutely no trouble with the app, accurate
                distance and step count and burnt calories too are also
                accurate. It takes virtually no power [battery life] at all.”{" "}
              </em>
              - Stephen Snell, Google Play Store user review
            </p>
            <p>
              <em>
                “Most of the apps out there are for equipment you have to buy
                which are not cheap. This app makes use of your smartphone
                sensors to senses your motion and includes adjustments for
                sensitivity and accuracy.”
              </em>{" "}
              - Donald Chase, Google Play Store user review
            </p>
            <h2>
              <b>
                5. Argus by Azumio (
                <a
                  href="https://itunes.apple.com/us/app/argus-pedometer-run-cycle/id624329444?mt=8"
                  rel="nofollow"
                >
                  iOS
                </a>{" "}
                and{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.azumio.android.argus"
                  rel="nofollow"
                >
                  Android
                </a>
                )
              </b>
            </h2>
            <p>
              <b>Cost: </b>Free | Offers in-app purchases
              <br />
              <b>iTunes App Store customer rating: </b>4.9/5
              <br />
              <b>Google Play Store customer rating: </b>4.3/5
              <br />
              <b>What to know: </b>Connect with users all over the world. It’s a
              combination health and fitness app. Uses GPS technology to track
              steps.
            </p>
            <p>
              Are you and your pooch the competitive type? This app tracks your
              daily steps and competes with other users from around the globe,
              and it uses GPS navigation to track your walks. The app also
              offers additional features, like tracking for sleep and heart
              rate, as well as meal plans. Grab the leash and go!
            </p>
            <p>
              <em>
                “I set out to lose weight and live a more healthy lifestyle …
                The daily data reports were so impressive, I purchased the App
                for more benefits and detailed use.”
              </em>{" "}
              - Renokingswordsnpoetry, iTunes App Store user review
            </p>
            <p>
              <em>
                “I have had this app on both my Android and my iPhone. It works
                really well and is relative to keeping an idea of your progress
                and where you might improve to live a healthier lifestyle.”
              </em>{" "}
              - Mallory Miller, Google Play Store user review
            </p>
            <h2>
              <b>
                6. Fitbit App MobileTracker (
                <a
                  href="https://itunes.apple.com/us/app/fitbit/id462638897?mt=8"
                  rel="nofollow"
                >
                  iOS
                </a>{" "}
                and{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.fitbit.FitbitMobile&amp;hl=en"
                  rel="nofollow"
                >
                  Android
                </a>
                ){" "}
              </b>
            </h2>
            <p>
              <b>Cost: </b>Free
              <br />
              <b>iTunes App Store customer rating: </b>3.9/5
              <br />
              <b>Google Play Store customer rating: </b>3.9/5
              <br />
              <b>What to know: </b>Creates custom walking maps based on your
              path. No Fitbit required. Share your stats with friends.
            </p>
            <p>
              No Fitbit? No problem! The app uses your phone’s built-in motion
              sensor to track your steps and distance walked, and it saves the
              walking path you and your pooch enjoy together. You’ll need to
              hold your phone in your hand or buy an armband holder for your
              phone to get the most accurate results.{" "}
            </p>
            <p>
              <em>
                “I love all the different features that can help you stay fit.
                This app encourages me to stay on my diet, or keep working out,
                or just maintaining a healthier lifestyle, even when the time
                gets tough.”
              </em>{" "}
              - Kendal_Toby, iTunes App Store user review
            </p>
            <p>
              <em>
                “The features in the app are brilliant and I love how it tracks
                it all automatically.”{" "}
              </em>
              - John Grant, Google Play Store user review
            </p>
            <h2>
              <b>
                7. Endomondo (
                <a
                  href="https://itunes.apple.com/us/app/endomondo/id333210180?mt=8"
                  rel="nofollow"
                >
                  iOS
                </a>{" "}
                and{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.endomondo.android&amp;hl=en_US"
                  rel="nofollow"
                >
                  Android
                </a>
                ){" "}
              </b>
            </h2>
            <p>
              <b>Cost:</b> Free
              <br />
              <b>iTunes App Store customer rating: </b>4.6/5
              <br />
              <b>Google Play Store customer rating: </b>4.5/5
              <br />
              <b>What to know: </b>Syncs with other apps and fitness devices.
              Tracks over 40 activities using GPS. Allows you to set walking
              goals.
            </p>
            <p>
              This highly rated app, created by Under Armour, allows you to set
              walking goals for yourself while you’re on your daily stroll with
              your dog. Using GPS technology, Endomondo allows you to view your
              previous walking paths, check your exercise stats, and share them
              with friends on social media to keep you and your pooch motivated.
            </p>
            <p>
              <em>
                “I love the range of activities on the app as well as the
                post-workout stats!”
              </em>{" "}
              - DOJ1975, iTunes App Store user review
            </p>
            <p>
              <em>
                "Wanted something that tracked distance and route - this is
                perfect."
              </em>{" "}
              - Lucy Oates, Google Play Store user review
            </p>
            <h2>
              <b>
                8. Charity Miles (
                <a
                  href="https://itunes.apple.com/us/app/charity-miles/id505253234?mt=8"
                  rel="nofollow"
                >
                  iOS
                </a>{" "}
                and{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.charitymilescm.android&amp;hl=en"
                  rel="nofollow"
                >
                  Android
                </a>
                ){" "}
              </b>
            </h2>
            <p>
              <b>Cost: </b>Free
              <br />
              <b>iTunes App Store customer rating:</b> 4.8/5
              <br />
              <b>Google Play Store customer rating: </b>4.2/5
              <br />
              <b>What to know: </b>Raise money for over 40 charities. Does not
              track walking route. Works just like a pedometer.
            </p>
            <p>
              Thanks to Charity Miles, you can walk your dog and raise money for
              a good cause of your choice. The app was rated “Best Overall App”
              by Women’s Running Magazine and “Game Changer of the Year” by
              Men’s Fitness. The app tracks distance, time, and speed. The more
              you move, the more you raise! Choose from over 40 charities.
            </p>
            <p>
              <em>“I use it every time I go on runs.”</em> - Oscean, iTunes App
              Store user review
            </p>
            <p>
              <em>
                “I really thankful and happy to find this app, it motivated me
                to exercise because I really want to help doing more for those
                in need.”
              </em>{" "}
              - Yu Huei Chen, Google Play Store user review
            </p>
            <h2>
              <b>
                9. Nike + Run Club (
                <a
                  href="https://itunes.apple.com/us/app/nike-run-club/id387771637?mt=8"
                  rel="nofollow"
                >
                  iOS
                </a>{" "}
                and{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.nike.plusgps&amp;hl=en"
                  rel="nofollow"
                >
                  Android
                </a>
                ){" "}
              </b>
            </h2>
            <p>
              <b>Cost: </b>Free
              <br />
              <b>iTunes App Store customer rating: </b>4.7/5
              <br />
              <b>Google Play Store customer rating: </b>4.4/5
              <br />
              <b>What to know: </b>Not just for runners. Easily track walking
              routes. Share data with friends.
            </p>
            <p>
              Your dog isn’t a runner? Neither are you? Don’t let the name of
              this app deter you, because it can be used for more than just
              running! The user-friendly interface allows you to track your
              walking route, calories burned, distance, speed, and more. Share
              it with friends or your dog walker so they can take advantage of
              your pooch’s favorite walking path.
            </p>
            <p>
              <em>
                “I've only been using this app for a couple of weeks, but it has
                been working wonders for me.”
              </em>{" "}
              - CTrip342334, iTunes App Store user review
            </p>
            <p>
              <em>
                “...it's a great tool to monitor your walk and distance.”{" "}
              </em>
              - Zachary Baatz, Google Play Store user review
              <br />
            </p>
            <p>
              There’s nothing like enjoying the outdoors with mans best friend.
              Have you tried out one of the above walking apps yet with your
              pooch? Let us know in the comments, and happy walking!
              <br />
            </p>
          </Col>
        </Row>
      </>
    );
  }
}
