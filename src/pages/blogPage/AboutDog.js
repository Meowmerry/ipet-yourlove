import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { Row, Col } from "antd";
import "./Blog.scss";

export default class AboutDog extends Component {
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
          <h1>All about dogs: 101 fun facts</h1>
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
            src="https://cdn.kinsights.com/cache/1d/7d/1d7da287e60a0d6d2dc6681e8d85991b.jpg"
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
              <strong>
                Your dog is your best friend but there's a lot you might not
                know about him! Whether your dog is young or old, these fun
                facts about dogs will give you 101 new reasons to love your
                furry friend:
              </strong>
            </p>
            <br />
            <ol>
              <li>
                Puppies love games such as hide and seek! Hide, then call your
                pup's name so she can try to find you.
                <br />
              </li>
              <li>
                Dogs can learn more than{" "}
                <a
                  href="http://www.animalplanet.com/pets/how-many-words-do-dogs-know/"
                  rel="nofollow"
                >
                  1000 words
                </a>
                .<br />
              </li>
              <li>
                Big happy "helicopter" tail wagging is one sign of a really nice
                dog
                <br />
              </li>
              <li>
                Upright, stiff, rapid tail movement is not wagging or "friendly"
                but indicates a dog who's rather excited and focused.
                <br />
              </li>
              <li>
                Puppies grow to half their body weight in the first four to five
                months!
                <br />
              </li>
              <li>
                Puppies then take a year or more to gain the other half of their
                body weight.
                <br />
              </li>
              <li>
                Puppies can sleep 18 to 20 hours a day during that rapid body
                growth phase.
                <br />
              </li>
              <li>
                Dogs sometimes appear to{" "}
                <a
                  href="https://www.aspca.org/pet-care/virtual-pet-behaviorist/dog-behavior/canine-body-language"
                  rel="nofollow"
                >
                  smile
                </a>{" "}
                — much like humans — with open mouth grinning. This may indicate
                a relaxed, submissive state.
                <br />
              </li>
              <li>
                Tired puppies get cranky just like little kids. If you have a
                fussy puppy, try nap time.
                <br />
              </li>
              <li>
                The{" "}
                <a
                  href="http://www.akc.org/dog-breeds/greyhound/"
                  rel="nofollow"
                >
                  fastest breed
                </a>
                , the Greyhound, can run up to 44 miles per hour.
                <br />
              </li>
              <li>
                Perky-eared dogs{" "}
                <a
                  href="http://www.dogbreedinfo.com/articles/dogsenses.htm"
                  rel="nofollow"
                >
                  hear sounds better
                </a>{" "}
                than floppy-eared dogs.
                <br />
              </li>
              <li>
                There are about{" "}
                <a
                  href="http://www.sciencekids.co.nz/sciencefacts/animals/dog.html"
                  rel="nofollow"
                >
                  400 million dogs
                </a>{" "}
                in the world.
                <br />
              </li>
              <li>
                The{" "}
                <a
                  href="http://www.akc.org/news/the-most-popular-dog-breeds-in-america/"
                  rel="nofollow"
                >
                  Labrador Retriever
                </a>{" "}
                is the most popular breed, according to the American Kennel
                Club.
                <br />
              </li>
              <li>
                There are hundreds of breeds of dogs.
                <br />
              </li>
              <li>
                The average dog lives{" "}
                <a
                  href="http://www.sciencekids.co.nz/sciencefacts/animals/dog.html"
                  rel="nofollow"
                >
                  10 to 14 years
                </a>
                .<br />
              </li>
              <li>
                In general, smaller breeds live longer than larger breeds.
                <br />
              </li>
              <li>
                The world's oldest breed, the{" "}
                <a href="http://www.akc.org/dog-breeds/saluki/" rel="nofollow">
                  Saluki
                </a>
                , originated in Egypt around 329 B.C.
                <br />
              </li>
              <li>
                According to a{" "}
                <a
                  href="http://www.news.cornell.edu/stories/2014/01/study-narrows-origin-dogs"
                  rel="nofollow"
                >
                  study
                </a>{" "}
                shared by Cornell University, dogs were domesticated between
                9,000 and 34,000 years ago.
                <br />
              </li>
              <li>
                Thomas Jefferson helped enact a{" "}
                <a
                  href="http://www.monticello.org/site/house-and-gardens/dogs"
                  rel="nofollow"
                >
                  dog tax
                </a>{" "}
                in Virginia, because he was annoyed that dogs were killing his
                sheep.
                <br />
              </li>
              <li>
                Stroking dogs and gazing into their eyes releases the "feel
                good" hormone oxytocin for both people and dogs.
                <br />
              </li>
              <li>
                Dogs are{" "}
                <a
                  href="http://www.sciencekids.co.nz/sciencefacts/animals/dog.html"
                  rel="nofollow"
                >
                  omnivores
                </a>{" "}
                -- they eat meat, grains and vegetables.
                <br />
              </li>
              <li>
                The heaviest breed, the{" "}
                <a href="http://www.akc.org/dog-breeds/mastiff/" rel="nofollow">
                  Mastiff
                </a>
                , weighs about 200 pounds.
                <br />
              </li>
              <li>
                More than{" "}
                <a
                  href="http://www.mans-best-friend.org.uk/american-presidents-dogs.htm"
                  rel="nofollow"
                >
                  half of all U.S. presidents
                </a>{" "}
                have owned dogs.
                <br />
              </li>
              <li>
                <a
                  href="http://www.mans-best-friend.org.uk/american-presidents-dogs.htm"
                  rel="nofollow"
                >
                  President Calvin Coolidge
                </a>{" "}
                owned at least a dozen dogs.
                <br />
              </li>
              <li>
                Just like human fingerprints,{" "}
                <a
                  href="http://www.dogingtonpost.com/interesting-facts-about-your-dogs-nose/"
                  rel="nofollow"
                >
                  no two dogs' nose prints are alike
                </a>
                .<br />
              </li>
              <li>
                At about 6 inches, the{" "}
                <a
                  href="http://www.akc.org/dog-breeds/chihuahua/"
                  rel="nofollow"
                >
                  Chihuahua
                </a>{" "}
                is the shortest breed.
                <br />
              </li>
              <li>
                <a
                  href="http://www.akc.org/dog-breeds/irish-wolfhound/"
                  rel="nofollow"
                >
                  Irish Wolfhounds
                </a>
                , the tallest breed, are 30 to 35 inches tall.
              </li>
              <li>
                A{" "}
                <a href="http://time.com/3546215/laika-1957/" rel="nofollow">
                  Russian dog named Laika
                </a>{" "}
                was the first animal in space, traveling around Earth in 1957.
                <br />
              </li>
              <li>
                Dogs who{" "}
                <a
                  href="http://www.barkingdogs.net/excessivebarking.shtml"
                  rel="nofollow"
                >
                  bark the most
                </a>
                : Miniature Schnauzers, Cairn Terriers, Yorkshire Terriers, Fox
                Terriers and West Highland White Terriers.
                <br />
              </li>
              <li>
                Puppies have{" "}
                <a
                  href="https://www.petfinder.com/dogs/bringing-a-dog-home/facts-about-new-dog/"
                  rel="nofollow"
                >
                  28 teeth
                </a>{" "}
                and adult dogs have 42.
                <br />
              </li>
              <li>
                The best age to{" "}
                <a href="http://pets.webmd.com/dogs/" rel="nofollow">
                  bring a puppy home
                </a>{" "}
                is 8 to 12 weeks.
                <br />
              </li>
              <li>
                <a
                  href="http://www.dogbreedinfo.com/articles/dogsenses.htm"
                  rel="nofollow"
                >
                  Dogs can see best
                </a>{" "}
                at dawn and dusk.
                <br />
              </li>
              <li>
                <a
                  href="http://www.dogbreedinfo.com/articles/dogsenses.htm"
                  rel="nofollow"
                >
                  Dogs aren't colorblind
                </a>{" "}
                but their eyes don't have receptors for red. They see in shades
                of black and white and also in shades of blue and yellow.
                <br />
              </li>
              <li>
                New puppies have{" "}
                <a
                  href="http://www.dogbreedinfo.com/articles/dogsenses.htm"
                  rel="nofollow"
                >
                  heat sensors in their noses
                </a>{" "}
                to help find their moms while their eyes and ears are closed.
                <br />
              </li>
              <li>
                A dog's sense of smell is reduced by up to 40 percent when he's
                overheated and panting.
                <br />
              </li>
              <li>
                <a href="http://pets.webmd.com/dogs/" rel="nofollow">
                  Highly trainable dog breeds
                </a>{" "}
                like Golden Retrievers, Labrador Retrievers, German Shepherds
                and Collies are more kid-friendly than some other breeds.
                <br />
              </li>
              <li>
                Bichons, Portuguese Water Dogs, Kerry Blue Terriers, Maltese and
                Poodles are all good choices{" "}
                <a href="http://pets.webmd.com/dogs/" rel="nofollow">
                  if you have allergies
                </a>{" "}
                since they shed less than other breeds.
                <br />
              </li>
              <li>
                More than{" "}
                <a
                  href="https://www.aspca.org/about-us/faq/pet-statistics"
                  rel="nofollow"
                >
                  one in three
                </a>{" "}
                U.S. families owns a dog.
                <br />
              </li>
              <li>
                The average number of{" "}
                <a
                  href="http://www.mspca.org/programs/pet-owner-resources/pet-owner-guides/dog-care-adoption/interesting-facts-dogs.html?referrer=https://www.google.com/"
                  rel="nofollow"
                >
                  puppies in a litter
                </a>{" "}
                is four to six.
                <br />
              </li>
              <li>
                There are nearly{" "}
                <a
                  href="http://www.mspca.org/programs/pet-owner-resources/pet-owner-guides/dog-care-adoption/interesting-facts-dogs.html?referrer=https://www.google.com/"
                  rel="nofollow"
                >
                  14,000 animal shelters
                </a>{" "}
                and rescue groups across North America.
                <br />
              </li>
              <li>
                Service dogs are recognized in the U.S. as "necessary medical
                equipment."
                <br />
              </li>
              <li>
                <a
                  href="http://www.mspca.org/programs/pet-owner-resources/pet-owner-guides/dog-care-adoption/interesting-facts-dogs.html?referrer=https://www.google.com/"
                  rel="nofollow"
                >
                  Therapy dogs
                </a>
                , who bring healing to individuals and families by visiting
                hospitals,
                <br />
                schools or retirement homes, differ from service dogs, who
                assist individuals who have disabilities.
                <br />
              </li>
              <li>
                The{" "}
                <a
                  href="http://dogtime.com/dog-breeds/newfoundland"
                  rel="nofollow"
                >
                  Newfoundland
                </a>{" "}
                has a water-resistant coat and webbed feet.
                <br />
              </li>
              <li>
                As Disney's Cruella De Vil was aware,{" "}
                <a
                  href="http://dogtime.com/dog-breeds/dalmatian"
                  rel="nofollow"
                >
                  Dalmatian puppies
                </a>{" "}
                are born pure white and develop spots as they grow older.
                <br />
              </li>
              <li>
                <a
                  href="http://www.pethealthnetwork.com/dog-health/dog-diseases-conditions-a-z/do-dogs-sweat"
                  rel="nofollow"
                >
                  Dogs sweat
                </a>{" "}
                through the pads of their feet.
                <br />
              </li>
              <li>
                Dogs have{" "}
                <a
                  href="http://iheartdogs.com/what-you-need-to-know-about-your-dogs-third-eyelid/"
                  rel="nofollow"
                >
                  three eyelids
                </a>
                , including one to keep their eyes moist and protected.
                <br />
              </li>
              <li>
                <a
                  href="http://www.akc.org/dog-breeds/chow-chow/"
                  rel="nofollow"
                >
                  Chow Chows
                </a>{" "}
                are born with pink tongues, which turn blue-black at 8 to 10
                weeks.
                <br />
              </li>
              <li>
                Dogs are{" "}
                <a
                  href="http://www.sciencedaily.com/terms/dog_intelligence.htm"
                  rel="nofollow"
                >
                  pack animals
                </a>{" "}
                — they don't enjoy being alone.
                <br />
              </li>
              <li>
                In ancient China, people kept warm by{" "}
                <a
                  href="http://asianhistory.about.com/od/china/p/History-of-the-Pekingese-Dog.htm"
                  rel="nofollow"
                >
                  putting dogs up their sleeves
                </a>
                .<br />
              </li>
              <li>
                <a
                  href="http://www.sciencedaily.com/releases/2013/04/130417185904.htm"
                  rel="nofollow"
                >
                  Dogs who have been spayed or neutered
                </a>{" "}
                live longer than intact dogs.
                <br />
              </li>
              <li>
                A bloodhound named{" "}
                <a
                  href="http://www.guinnessworldrecords.com/world-records/longest-ears-on-a-dog-ever"
                  rel="nofollow"
                >
                  Tigger
                </a>{" "}
                holds the record for the longest ears, each measuring more than
                13 inches.
                <br />
              </li>
              <li>
                <a
                  href="http://www.crackerjackcollectors.com/cjcahistory.htm"
                  rel="nofollow"
                >
                  Bingo
                </a>{" "}
                is the name of the dog on the box of Cracker Jacks.
                <br />
              </li>
              <li>
                In 1969,{" "}
                <a href="http://www.lassie.com/" rel="nofollow">
                  Lassie
                </a>{" "}
                was the first animal inducted into the Animal Hall of Fame.
                <br />
              </li>
              <li>
                The{" "}
                <a
                  href="http://www.dogbreedindex.com/dog/details/alaskan-malamute"
                  rel="nofollow"
                >
                  Alaskan Malamute
                </a>{" "}
                can withstand temperatures as low as 70 degrees below zero.
                <br />
              </li>
              <li>
                <a
                  href="http://www.webmd.com/hypertension-high-blood-pressure/features/6-ways-pets-improve-your-health"
                  rel="nofollow"
                >
                  Petting a dog
                </a>{" "}
                can lower your blood pressure.
                <br />
              </li>
              <li>
                <a
                  href="http://abcnews.go.com/International/Technology/stray-dogs-master-complex-moscow-subway-system/story?id=10145833"
                  rel="nofollow"
                >
                  Stray dogs in Moscow
                </a>{" "}
                have learned to ride the subway to find food.
                <br />
              </li>
              <li>
                Over half of dog owners include their dogs in{" "}
                <a
                  href="http://www.natural-wonder-pets.com/how-much-do-americans-love-dogs.html"
                  rel="nofollow"
                >
                  annual holiday photos
                </a>
                .<br />
              </li>
              <li>
                Although it was once{" "}
                <a
                  href="http://iheartdogs.com/14-crazy-dogs-laws-thatll-make-you-laugh-out-loud/"
                  rel="nofollow"
                >
                  illegal to keep dogs as pets
                </a>{" "}
                in Iceland's capital city, the laws have been relaxed.
                <br />
              </li>
              <li>
                President Lyndon Johnson's beagles were named{" "}
                <a
                  href="http://www.mans-best-friend.org.uk/american-presidents-dogs.htm"
                  rel="nofollow"
                >
                  Him and Her
                </a>
                .<br />
              </li>
              <li>
                One unspayed female dog, her mate and their puppies can produce{" "}
                <a
                  href="http://www.mspca.org/programs/pet-owner-resources/pet-owner-guides/dog-care-adoption/interesting-facts-dogs.html?referrer=https://www.google.com/"
                  rel="nofollow"
                >
                  67,000 puppies in six years
                </a>
                .<br />
              </li>
              <li>
                The{" "}
                <a
                  href="http://www.mspca.org/programs/pet-owner-resources/pet-owner-guides/dog-care-adoption/interesting-facts-dogs.html?referrer=https://www.google.com/"
                  rel="nofollow"
                >
                  Basenji
                </a>{" "}
                is the only barkless dog.
                <br />
              </li>
              <li>
                Dogs are direct descendants of{" "}
                <a
                  href="http://www.mspca.org/programs/pet-owner-resources/pet-owner-guides/dog-care-adoption/interesting-facts-dogs.html?referrer=https://www.google.com/"
                  rel="nofollow"
                >
                  wolves
                </a>
                .<br />
              </li>
              <li>
                Puppies are{" "}
                <a
                  href="http://www.mspca.org/programs/pet-owner-resources/pet-owner-guides/dog-care-adoption/interesting-facts-dogs.html?referrer=https://www.google.com/"
                  rel="nofollow"
                >
                  blind, deaf and toothless
                </a>{" "}
                when born.
                <br />
              </li>
              <li>
                <a href="http://www.vetstreet.com/" rel="nofollow">
                  Dogs curl up
                </a>{" "}
                to keep themselves warm and protect vital organs.
                <br />
              </li>
              <li>
                A dog's sense of smell is{" "}
                <a
                  href="http://www.pbs.org/wgbh/nova/nature/dogs-sense-of-smell.html"
                  rel="nofollow"
                >
                  10,000 times stronger
                </a>{" "}
                than a human's.
                <br />
              </li>
              <li>
                The{" "}
                <a
                  href="http://www.akc.org/dog-breeds/norwegian-lundehund/detail/#didyouknow"
                  rel="nofollow"
                >
                  Norwegian Lundehund
                </a>{" "}
                is the only dog with six toes on each foot.
                <br />
              </li>
              <li>
                <a
                  href="http://www.cnn.com/2014/07/25/living/study-dogs-jealousy/"
                  rel="nofollow"
                >
                  Dogs can get jealous
                </a>{" "}
                when their humans display affection toward someone or something
                else.
                <br />
              </li>
              <li>
                Dogs can be trained to{" "}
                <a
                  href="http://www.cleveland.com/healthfit/index.ssf/2012/06/how_dogs_detect_cancer_other_d.html"
                  rel="nofollow"
                >
                  detect cancer
                </a>{" "}
                and other diseases in humans.
                <br />
              </li>
              <li>
                A{" "}
                <a
                  href="http://www.vetstreet.com/our-pet-experts/whats-the-deal-with-whiskers"
                  rel="nofollow"
                >
                  dog's whiskers
                </a>{" "}
                are used as sensing devices.
                <br />
              </li>
              <li>
                Three of the 12{" "}
                <a
                  href="http://www.smithsonianmag.com/smart-news/definitive-guide-dogs-titanic-180950319/"
                  rel="nofollow"
                >
                  dogs on the Titanic
                </a>{" "}
                survived.
                <br />
              </li>
              <li>
                <a
                  href="http://www.dognotebook.com/how-long-does-it-take-for-a-pup-to-reach-its-full-size/"
                  rel="nofollow"
                >
                  Your pup reaches his full size
                </a>{" "}
                between 12 and 24 months.
                <br />
              </li>
              <li>
                The U.S. has the{" "}
                <a href="http://www.humanesociety.org/" rel="nofollow">
                  highest dog population in the world
                </a>
                .<br />
              </li>
              <li>
                <a href="http://www.rintintin.com/the-hero.html" rel="nofollow">
                  Rin Tin Tin
                </a>{" "}
                was the first Hollywood dog star.
                <br />
              </li>
              <li>
                A dog's average{" "}
                <a href="http://www.humanesociety.org/" rel="nofollow">
                  body temperature
                </a>{" "}
                is 101.2 degrees.
                <br />
              </li>
              <li>
                Many foot disorders in dogs are caused by long toenails.
                <br />
              </li>
              <li>
                The Boy Scouts and Girl Scouts both offer{" "}
                <a
                  href="http://www.petswelcome.com/articles/boy-and-girl-scouts-can-earn-pet-care-badges.html"
                  rel="nofollow"
                >
                  merit badges in dog care
                </a>
                .<br />
              </li>
              <li>
                The Berger Picard, Miniature American Shepherd and Lagotto
                Romagnolo are the{" "}
                <a
                  href="http://www.akc.org/news/meet-the-american-kennel-clubs-three-new-dog-breeds/"
                  rel="nofollow"
                >
                  newest dog breeds
                </a>{" "}
                recognized by the American Kennel Club in 2015.
                <br />
              </li>
              <li>
                Paul McCartney of the Beatles recorded a{" "}
                <a
                  href="http://www.gigwise.com/news/85705/paul-mccartney-reveals-secret-sound-for-dogs-hidden-on-sgt-pepper-album"
                  rel="nofollow"
                >
                  high pitched whistle
                </a>{" "}
                at the end of "A Day in the Life" for his dog.
                <br />
              </li>
              <li>
                <a
                  href="http://www.mspca.org/programs/pet-owner-resources/pet-owner-guides/dog-care-adoption/interesting-facts-dogs.html?referrer=https://www.google.com/"
                  rel="nofollow"
                >
                  Max, Jake, Maggie and Molly
                </a>{" "}
                are the most popular dog names.
                <br />
              </li>
              <li>
                <a
                  href="http://www.mydogcollars.com/pages/Spiked-and-Studded-Dog-Collars-History.html"
                  rel="nofollow"
                >
                  Spiked dog collars
                </a>{" "}
                were used to protect dogs' throats from wolf attacks in ancient
                Greece.
                <br />
              </li>
              <li>
                Walt Disney's family dog — named{" "}
                <a
                  href="http://www.waltdisney.org/blog/walts-valentine"
                  rel="nofollow"
                >
                  Sunnee
                </a>{" "}
                — was the inspiration behind "Lady and the Tramp."
                <br />
              </li>
              <li>
                Teams of dogs compete for the fastest time without errors in{" "}
                <a
                  href="http://www.flyball.org/aboutflyball.html"
                  rel="nofollow"
                >
                  Flyball
                </a>{" "}
                races.
                <br />
              </li>
              <li>
                A German Shepherd named Orient accompanied her blind owner Bill
                Irwin as he became the first blind person to through-hike the
                2,100-mile Appalachian Trail in 1990.
                <br />
              </li>
              <li>
                Chihuahuas are born with{" "}
                <a
                  href="http://www.akc.org/dog-breeds/chihuahua/"
                  rel="nofollow"
                >
                  soft spots in their skulls
                </a>
                , just like human babies.
                <br />
              </li>
              <li>
                <a
                  href="http://www.k9history.com/battle-dogs.htm"
                  rel="nofollow"
                >
                  Mastiffs wore armor
                </a>{" "}
                and were sent after mounted knights in Roman times.
                <br />
              </li>
              <li>
                National Geographic's Dr. Brady Barr measured a{" "}
                <a
                  href="https://dogfacts.wordpress.com/2008/02/03/national-geographics-dr-brady-barrs-bite-pressure-tests/"
                  rel="nofollow"
                >
                  dog's average bite force
                </a>{" "}
                at 320 pounds of pressure per square inch.
                <br />
              </li>
              <li>
                <a
                  href="http://christiananswers.net/dictionary/dog.html"
                  rel="nofollow"
                >
                  Dogs are mentioned in the Bible
                </a>{" "}
                more than 35 times.
                <br />
              </li>
              <li>
                <a href="http://www.humanesociety.org/" rel="nofollow">
                  Obesity
                </a>{" "}
                is the top health problem among dogs.
                <br />
              </li>
              <li>
                <a
                  href="http://www.akc.org/dog-breeds/dachshund/"
                  rel="nofollow"
                >
                  Dachshunds
                </a>{" "}
                were originally bred to fight badgers.
                <br />
              </li>
              <li>
                President Theodore Roosevelt's{" "}
                <a
                  href="http://www.petswelcome.com/articles/top-ten-presidential-dog-facts.html"
                  rel="nofollow"
                >
                  Bull Terrier Pete
                </a>{" "}
                ripped the pants off French Ambassador Jules Jusserand.
                <br />
              </li>
              <li>
                The Border Collie, Poodle and Golden Retriever are considered
                the{" "}
                <a
                  href="http://www.akc.org/dog-breeds/smartest-dogs/"
                  rel="nofollow"
                >
                  world's smartest dog breeds
                </a>
                .<br />
              </li>
              <li>
                <a
                  href="http://www.akc.org/dog-breeders/responsible-breeding/"
                  rel="nofollow"
                >
                  Smaller breeds of dogs
                </a>{" "}
                mature faster than larger breeds.
                <br />
              </li>
              <li>
                Dogs have{" "}
                <a
                  href="http://thebark.com/content/amazing-facts-about-dogs-ears"
                  rel="nofollow"
                >
                  twice as many muscles to move their ears
                </a>{" "}
                as humans, if you're looking for unusual facts about dogs!
                <br />
              </li>
              <li>
                Female dogs carry puppies for about{" "}
                <a href="http://www.humanesociety.org/" rel="nofollow">
                  nine weeks before birth
                </a>
                .<br />
              </li>
              <li>
                Dogs are{" "}
                <a
                  href="https://www.aspca.org/pet-care/virtual-pet-behaviorist/dog-behavior/canine-body-language"
                  rel="nofollow"
                >
                  naturally submissive
                </a>{" "}
                to any creature with a higher pack status.
                <br />
              </li>
              <li>
                The Chihuahua was named for the state in northwestern{" "}
                <a
                  href="http://www.akc.org/dog-breeds/chihuahua/"
                  rel="nofollow"
                >
                  Mexico
                </a>{" "}
                where they were discovered.
                <br />
              </li>
              <li>
                Dogs can be taught to{" "}
                <a
                  href="https://www.psychologytoday.com/blog/canine-corner/201103/do-dogs-know-mathematics"
                  rel="nofollow"
                >
                  count and solve simple math problems
                </a>
                .<br />
              </li>
              <li>
                With love and a little patience, dogs can learn to{" "}
                <a
                  href="http://www.dogtube.us/article/6-cool-and-easy-tricks-to-teach-your-dog"
                  rel="nofollow"
                >
                  walk backwards, salute and bow
                </a>
                .<br />
              </li>
              <li>
                Pit bulls have been given a bad rap.{" "}
                <a href="http://www.badrap.org/" rel="nofollow">
                  BADRAP
                </a>{" "}
                was started in the San Francisco Bay area on behalf of "pit
                bulls and their people" and was ranked nationally as a No. 1
                high-impact nonprofit for animal welfare.
                <br />
              </li>
              <li>
                Revolutionary War soldiers sometimes brought their dogs with
                them into battle. Such was the case with George Washington and
                his dog,{" "}
                <a
                  href="http://www.listnow.com/helpingpaws/articles/article_550.html"
                  rel="nofollow"
                >
                  Sweetlips
                </a>
                .<br />
              </li>
              <li>
                The American Water Spaniel was the first hunting breed developed
                to{" "}
                <a
                  href="http://www.akc.org/dog-breeds/american-water-spaniel/detail/"
                  rel="nofollow"
                >
                  retrieve from boats
                </a>
                .
              </li>
            </ol>
          </Col>
        </Row>
      </>
    );
  }
}
