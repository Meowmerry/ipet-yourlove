import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { Row, Col } from "antd";
import "./Blog.scss";

export default class Pet extends Component {
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
          <h1>Want to become a dog walker? </h1>
          <h1>Follow these expert steps on how to do it</h1>
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
            <strong>
              You love dogs. Given the choice between dogs or humans, it’s dogs
              every time. You find joy walking them, spending time with them and
              caring for them.
            </strong>
            <p>
              If this is an accurate description of you, you may be considering
              becoming a dog walker so you can do what you love most all of the
              time. It may seem like a simple transition, but ask anyone who
              does this for a living and they’ll tell you dog walking isn’t
              easy, and it comes with a set of challenges just like any other
              small business, especially as you grow.
            </p>
            <p>
              “Don’t get discouraged because it is hard. Just hang in there,
              believe in it and hustle,” says Heather Doll, who started dog
              walking in 2007 as an individual and now co-owns a business that
              grosses more than six figures a year and has 50 employees.
            </p>
            <p>
              Read on as Doll, of{" "}
              <a href="http://ruffcity.com/" rel="nofollow">
                RuffCity
              </a>{" "}
              dog walking in New York City, as well as other experts, share
              their tips for how to find success in dog walking.
            </p>
            <h2>1. Build a website, logo and social media presence</h2>
            <p>
              All these things are essential to attract customers initially.
              Doll built her website via{" "}
              <a href="http://WordPress.com" rel="nofollow">
                WordPress.com
              </a>
              , but{" "}
              <a href="http://Squarespace.com" rel="nofollow">
                Squarespace.com
              </a>{" "}
              and{" "}
              <a href="http://Weebly.com" rel="nofollow">
                Weebly.com
              </a>{" "}
              are also options. If you’d like to consult with a
              developer/freelancer to create your site, Doll suggests{" "}
              <a href="http://Upwork.com" rel="nofollow">
                Upwork.com
              </a>
              .
            </p>
            <p>
              “It is worth it to spend a little extra money and have a sharp,
              intuitive and informative website that proves that you are
              organized and professional,” she says. “A good logo can help you
              stand out from the competition. Establishing your brand is
              definitely the first [step]. I actually worked at an advertising
              agency before I left to start this [business], so I had the luxury
              of having designers make my logo and also build our website and
              kind of get us going in the right direction from the get go.”
            </p>
            <p>
              When she left that office job to start a dog walking service with
              her roommate, she says she "knew we wanted to grow [our business]
              into something larger, which is why we did a website and a logo.”
            </p>
            <p>
              Jacob Hensley, founder/owner of{" "}
              <a href="https://www.districtdogs.com/" rel="nofollow">
                District Dogs
              </a>{" "}
              in Washington, D.C., which offers dog walking, daycare and
              boarding, also stresses the importance of a strong brand.
            </p>
            <p>
              “For me, my brand and my brand image is what separates myself from
              my competitors,” he says. “I’m not just Jacob’s Pet Care or
              Jacob’s Dog Walking Service. I really wanted to brand myself.”
            </p>
            <p>
              Setting up an online profile for your business on Yelp, Instagram
              and Facebook is highly recommended.
            </p>
            <p>
              “Upload as many pictures as possible and provide as much
              information as possible,” Doll says, adding that good,
              old-fashioned networking is still important. “Make business cards
              and flyers and visit pet stores, vet offices, dog cafes, etc., and
              ask to post your flyers on their message boards. Visit dog parks
              and network with owners. In a world that is so reliant on the
              internet, people appreciate a personalized, grass-roots
              introduction to such a personal service.”
            </p>
            <h2>2. Acquire an LLC or, at the very least, a DBA filing</h2>
            <p>
              Setting up an LLC for your business can be done via websites like{" "}
              <a href="http://LegalZoom.com" rel="nofollow">
                LegalZoom.com
              </a>
              , which Doll used, but a lawyer can also do this for you.
            </p>
            <p>
              Why is it important?{" "}
              <a
                href="https://www.legalzoom.com/articles/advantages-of-an-llc"
                rel="nofollow"
              >
                LegalZoom’s website
              </a>{" "}
              says becoming an LLC limits your personal liability and there are
              tax advantages. For Doll, that protection was key.
            </p>
            <p>
              “The LLC basically protects you from if someone tries to sue based
              on something that happened within [your business], they can’t come
              after me personally; they can only come after anything that the
              business has,” she says.
            </p>
            <p>
              “As an LLC you have a little bit more coverage with your
              independent contractors,” says Liza Angerami, who purchased{" "}
              <a href="https://www.walksofnature.com/" rel="nofollow">
                Walks of Nature
              </a>{" "}
              dog walking/pet sitting business in November and switched the
              business to an LLC. “It’s just a safer way to run your business,
              rather than a DBA.”
            </p>
            <p>
              The benefits of a DBA, a.k.a. “Doing Business As” filing, aren’t
              as wide ranging.{" "}
              <a
                href="https://www.legalzoom.com/business/business-formation/dba-overview.html"
                rel="nofollow"
              >
                According to LegalZoom
              </a>
              , you’ll need one in most states to open a business bank account.
            </p>
            <p>
              “A DBA is super easy to get,” Doll says. “You have to acquire it
              from your city or your state. It just gives you an employer ID
              number and kind of sets you up. But it doesn’t protect you in any
              way like an LLC.”
            </p>
            <p>
              Hensley built his website and formed his business seven months
              before he quit his day job so he could hit the ground dog walking.
            </p>
            <p>
              “I actually did an S [corporation], which is taxed similarly to an
              LLC, but in hindsight I would have done an LLC,” he says. “I did
              an S corp because I thought I would get investors for my doggie
              daycare business, but the LLC would have given me more flexibility
              on a couple of items.”
            </p>
            <h2>3. Obtain dog walker insurance</h2>
            <p>
              For an individual walking dogs, dog walking/pet sitting insurance
              can be very affordable, and like an LLC, it offers protection for
              your business. General liability insurance, which protects against
              third party claims, is a good idea, also, say experts. For a full
              breakdown of what to consider when selecting insurance,{" "}
              <a href="https://www.care.com/c/stories/15181/your-guide-to-pet-insurance/">
                click here
              </a>
              .
            </p>
            <p>
              “You need insurance if you want to do pet sitting in someone
              else’s home, or if you want to have grooming as a part of your
              company, that’s a different kind of insurance,” says Angerami, who
              got her insurance with Business Insurers of the Carolinas through
              Pet Sitters International, an association that provides education
              and other resources.
            </p>
            <p>
              She adds that it’s important to “figure out what you want to
              include in your business and what insurance you’ll need for that.”
            </p>
            <p>Doll recommends bonding your business, as well.</p>
            <p>
              “Bonding protects any of the client’s property,” she says. “So
              whether the walker accidentally breaks a vase or they actually
              steal something, the bonding insurance — which is separate from
              the pet insurance but usually obtained with the same carrier —
              it’s definitely something you want to look into also and that’s
              even cheaper than the pet sitting insurance.”
            </p>
            <h2>4. Find a suitable scheduling and invoicing software</h2>
            <p>
              You may not think you need something like this to keep you
              organized at first. (How hard can it be to keep four clients
              straight?) But, says Doll, you’ll be glad to have it up and
              running as you grow. It also leaves a good impression with your
              clients.
            </p>
            <p>
              “When we started we were using Google calendar, Google maps,
              Google sheets, all things Google and eventually it just became
              smart to move to a one stop kind of shop,” she says. “We use Time
              to Pet right now, which is amazing. There’s an app for the walkers
              to use, that has their schedule, and that’s where they can see
              their pay stubs and all the dog information. It automatically
              generates invoices and automatically charges invoices.”
            </p>
            <p>
              Hensley also uses{" "}
              <a
                href="https://www.timetopet.com/dog-walking-software"
                rel="nofollow"
              >
                Time to Pet
              </a>
              , which charges $35 a month for solo dog walkers.
            </p>
            <p>
              “I had the wrong invoicing software and wrong scheduling software
              on day one and I got too big and I had to merge everything,” he
              says. “If you just start with the right software immediately, even
              if it’s a little more expensive, it just helps with the migration,
              client data and confusion.”
            </p>
            <h2>
              5. Crunch the numbers to determine how much you need to make
            </h2>
            <p>
              In 2014, Hensley left his career in finance to build his business.
              But before you consider doing that, he recommends taking a hard
              look at the numbers to determine what you need to make a living at
              it.
            </p>
            <p>
              “Really get familiar with the numbers, like realistically how many
              dogs you can see in a day,” he says. “If you’re leaving your job
              or you’re quitting, for me, I had to know that if I filled my day
              up with dogs, I could survive while doing business. For me, that
              was really important, making sure that I was getting into a field
              that could support my lifestyle.”
            </p>
            <p>
              In the beginning of your business, you may have to work two jobs
              or find other sources of income.
            </p>
            <p>
              “I live in a two-bedroom home, and I Airbnb’d my guest bedroom to
              help supplement my income while I was growing the business,” he
              says. “That was helpful, but I still ran the numbers to make sure
              I could survive off dog walking.”
            </p>
            <h2>6. Get familiar with employment laws in your state</h2>
            <p>
              Employment laws are tricky, so it’s a good idea to familiarize
              yourself with the laws in your state, because there may come a
              time when you need more hands to help juggle all the dog walking
              jobs.
            </p>
            <p>
              “When it is time to hire your first employee, you’ll want to be
              fully aware of the costs associated with staffing, the rights of
              the employee and your rights, as well,” Doll says. “If there’s one
              thing I would tell someone who wants to build a dog walking
              company, it’s do everything right from the beginning. Because we
              didn’t. One, because we didn’t know, and two, because we were just
              young and carefree. Nothing that we’ve learned has been easy.”
            </p>
            <p>
              Adds Hensley, who employs 12 dog walkers, “It’s really easy for
              employees to file different types of claims, and you want to be
              protected and make sure you’re doing everything right.”
            </p>
            <h3>7. Research other companies in your area</h3>
            <p>
              What does the top dog walking service in your area offer? What do
              they charge? Do they sell packages? Any information you can gather
              is helpful, even if it’s not in line with your own business plan
              or goals, Doll says.
            </p>
            <p>
              “I would even say put together a spreadsheet, the company name,
              what they charge for what length of walks, what kind of business
              method they kind of have,” she says. “Just kind of see what your
              competition is going to look like, and, obviously, to gauge what
              you should be charging. You want to be a little under the average
              but getting paid what you’re worth.”
            </p>
            <h2>8. Hustle, but work smart</h2>
            <p>
              Doll believes hard work is the foundation of her company’s growth.
              In the beginning she was “just making it work and hustling and
              doing 12 walks a day, hitting the ground running and making sure
              that I was setting myself up for every opportunity that came my
              way,” she says, trekking up and down New York City blocks.
            </p>
            <p>
              Saying yes to everything may not be possible all the time, notes
              Angerami, whose contractors drive to their dog walking jobs.
            </p>
            <p>
              “You’ll probably have to say no to clients sometimes, which I
              found really difficult,” she says. “I want to help everybody. I
              don’t want to say no to anyone. But sometimes it’s just not going
              to be a good match, or you’re just going to be too busy and you
              just don’t want to overextend yourself.”
            </p>
            <p>
              Hensley says he didn’t just want to be a dog walker, he wanted to
              be a business owner, so he was careful to structure his business
              because he didn’t want to be “all over the place,” he says.
            </p>
            <p>
              “I kept the territory very tight, and I wanted to grow smart,” he
              says. “I still was very selective. If someone wanted a regular
              Monday through Friday evening walk, I said ‘no’ because I was
              primarily a midday dog walking company. I would do the occasional
              evening walk, but I wouldn’t ruin my evenings as a sole dog walker
              for this one dog. I wanted to make sure my lifestyle wasn’t
              negatively affected.”
            </p>
            <h2>9. Don’t get discouraged</h2>
            <p>
              With dog walking becoming a more popular profession (and service)
              in recent years, there will be competition, but don’t let it get
              you down.
            </p>
            <p>
              “I still have to remind myself of [this]!” Doll says. “When we
              first set out, we spent a lot of time sulking about how we had no
              clients and worrying that we made a huge mistake leaving our
              advertising and interior design jobs. But our hard work and hustle
              slowly started to pay off, and we are now consistently in shock of
              what we’ve built.”
            </p>
            <p>
              Hensley agrees that this profession has its share of ups and
              downs.
            </p>
            <p>
              “It took me a lot longer to get my first client then I expected,”
              he says. “And it took a lot longer to get my second and third
              client than expected. But at some point, it’s like a snowball
              effect.”
            </p>
            <p>
              Doll recommends putting all your effort into making your dog
              walking business succeed by making happy customers out of each and
              every client.
            </p>
            <p>
              “If you’re going to do this, if you’re going to make the decision,
              put your all into it,” she says. “Just give it everything you
              have. Focus on the owners — taking care of the owners and
              obviously taking care of the dogs — because those are the ones
              that are really going to help get you to the next level.”
            </p>
          </Col>
        </Row>
      </>
    );
  }
}
