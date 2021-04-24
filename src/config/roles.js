const components = {
  home: {
    component: "HomePage",
    url: "/home"
  },
  findjobs: {
    component: "FindJobsPage",
    url: "/findjobs"
  },
  findcare: {
    component: "FindCarePage",
    url: "/findcare"
  },
  service: {
    component: "ServiceInfo",
    url: "/service"
  },
  pet_guide: {
    component: "PetGuide",
    url: "/pet-guide"
  },
  blog_dog: {
    component: "AboutDog",
    url: "/blog-dog"
  },
  blog_app: {
    component: "AppWalk",
    url: "/blog-app"
  },
  blog_pet: {
    component: "Pet",
    url: "/blog-pet"
  },
  aboutus: {
    component: "AboutUs",
    url: "/aboutus"
  },
  profile: {
    component: "ProfileUserPage",
    url: "/profile"
  },
  admin: {
    component: "AdminPage",
    url: "/admin"
  }
};

export default {
  ADMIN: {
    routes: [
      components.home,
      components.admin
    ],
    redirect: ["/home"]
  },
  USER: {
    routes: [
      components.home,
      components.findjobs,
      components.findcare,
      components.service,
      components.pet_guide,
      components.blog_dog,
      components.blog_app,
      components.blog_pet,
      components.aboutus,
      components.profile
    ],
    redirect: ["/home"]
  },
  GUEST: {
    routes: [
      components.home,
      components.findjobs,
      components.findcare,
      components.service,
      components.pet_guide,
      components.blog_dog,
      components.blog_app,
      components.blog_pet,
      components.aboutus,
    ],
    redirect: ["/home"]
  }
};
