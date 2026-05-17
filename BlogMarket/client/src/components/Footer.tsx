import { NavLink } from "react-router-dom"

const Footer = () => {

  const footerNavList = [
    [
      { text: 'Feature Blogs', link: '/featureBlogs' },
      { text: 'Most viewed', link: '/mostViewed' },
      { text: 'Readers Choice', link: '/readersChoice' },
    ],
    [
      { text: 'Forum', link: '/forum' },
      { text: 'Support', link: '/support' },
      { text: 'Recent Posts', link: '/recentPosts' },
    ],
    [
      { text: 'Privacy Policy', link: '/privacy-policy' },
      { text: 'About Us', link: '/aboutUs' },
      { text: 'Terms & Conditions', link: '/termsAndCondition' },
      { text: 'Terms of Service', link: '/termsOfService' },
    ],
  ]

  return (
    <footer className="flex flex-col items-center text-gray-50 bg-[rgb(21,21,21)] py-8">
      <div className="flex justify-around w-full">

        {
          footerNavList.map((navList, index) => (
            <div key={index} className="flex flex-col justify-center">
              {
                navList.map(v => (
                  <NavLink key={v.text} to={v.link} className={'hover:text-gray-400'}>{v.text}</NavLink>
                ))
              }
            </div>
          ))
        }

      </div>

      <p className="mt-4">All rights reserved ©️Blog Market 2026</p>
    </footer>
  )
}

export default Footer