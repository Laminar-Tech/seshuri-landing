import React, { useState } from 'react'

const links = ['About', 'Features', 'How to Use', 'Download']

export default function index() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleNavbar = () => setIsOpen(c => !c)
    return (
        <div>
            <nav className="bg-gray-800 shadow-lg text-gray-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="flex space-x-7 justify-between w-full">
                            <div>
                                <a href="#" className="flex items-center py-4 px-2">
                                    <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                                    <span className="font-semibold text-gray-200 text-lg">Seshuri</span>
                                </a>
                            </div>
                            <div className="hidden md:flex items-center space-x-1">
                                {links.map(link => (
                                    <a key={link} href="" className="py-4 px-2 font-semibold hover:text-blue-500 transition duration-300">{link}</a>
                                ))}
                                <a href="" className="py-2 px-2 font-medium bg-blue-500 rounded hover:bg-blue-400 transition duration-300">Client Portal</a>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="outline-none mobile-menu-button" onClick={toggleNavbar}>
                                <svg className=" w-6 h-6 hover:text-blue-500 "
                                    x-show="!showMenu"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${isOpen ? "" : "hidden"} md:hidden mobile-menu`}>
                    <ul className="">
                        {links.map(link => (
                            <li key={link}><a href="#" className="block text-md px-2 py-4 hover:bg-blue-500 transition duration-300 font-semibold">{link}</a></li>
                        ))}
                        <li><a href="#contact" className="block text-md px-2 py-4 hover:bg-blue-500 transition duration-300 font-semibold">Client Portal</a></li>
                    </ul>
                </div>
            </nav>
            <section className='bg-gradient-to-br from-blue-700 to-cyan-300 pt-16'>
                <div className='md:mx-16'>
                    <div className='mt-16 md:mt-0 bg-bottom lg:bg-right bg-cover md:bg-contain bg-no-repeat h-screen flex justify-center lg:justify-start items-start lg:items-center' style={{ backgroundImage: 'url("/img-top.png")' }}>
                        <div className='text-gray-100 text-center lg:text-left text-shadow lg:ml-16 xl:ml-40 lg:-mt-96 xl:-mt-72 -mt-16 md:mt-0'>
                            <h1 className='text-6xl sm:text-8xl font-bold mb-4'>Seshuri</h1>
                            <p className='text-2xl sm:text-3xl font-semibold opacity-90 mb-8'>Presence, reimagined.</p>
                            <button className='bg-black text-white px-8 py-4 rounded-md font-semibold uppercase tracking-wide font-mono hover:shadow-md hover:-translate-y-0.5 transition-all duration-75'>{'>'} Let's talk</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-16 px-8 flex flex-col justify-center items-center gap-8 bg-gray-800 text-gray-200">
                <p className="font-thin tracking-widest uppercase opacity-70">Seshuri by Laminar Tech</p>
                <h2 className="text-4xl font-bold tracking-wide max-w-xl text-center">The on-demand website team that you never had to hire</h2>
                <img src="dash-device.png" className="w-auto lg:max-w-2xl" />
            </section>
            <section className="py-16 px-8 flex flex-row justify-center items-center gap-8 bg-gray-100 text-gray-800">
                <div>
                    <p className="font-thin tracking-widest uppercase opacity-70 mb-8">We Design</p>
                    <h2 className="text-4xl font-bold tracking-wide max-w-lg mb-4">Customised Websites for your Business Needs</h2>
                    <p className="text-xl max-w-lg opacity-90">Let your business wow the crowd without breaking the bank. Why settle for just any old template on the internet?</p>
                </div>
                <img src="dash-device.png" className="w-auto lg:max-w-2xl" />
            </section>
            <section className="py-16 px-8 flex flex-row-reverse justify-center items-center gap-8 bg-gray-100 text-gray-800">
                <div>
                    <p className="font-thin tracking-widest uppercase opacity-70 mb-8">We Build</p>
                    <h2 className="text-4xl font-bold tracking-wide max-w-lg mb-4">Features your Customers will be Grateful For</h2>
                    <p className="text-xl max-w-lg opacity-90">We implement essential features that bring your user's experience to the next level</p>
                </div>
                <img src="dash-device.png" className="w-auto lg:max-w-2xl" />
            </section>
        </div>
    )
}
