import React, { useState } from 'react'
import { Notification } from '@mantine/core';

const links = ['About', 'Features', 'Contact']
const EMAIL = 'ask@seshuri.com'
const STATUS = { WAITING: 'WAITING', LOADING: 'LOADING', SUCCESS: 'SUCCESS', ERROR: 'ERROR' }
export default function index() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleNavbar = () => setIsOpen(c => !c)

    const [status, setStatus] = useState('WAITING')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus(STATUS.LOADING)

        fetch('/api/send-email', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ email, name, message })
        }).then(response => {
            console.log(response)
            setStatus(STATUS.SUCCESS)
        })
            .catch(err => {
                console.log(err)
                setStatus(STATUS.ERROR)
            })
    }

    return (
        <div>
            <nav className="bg-gray-800 shadow-lg text-gray-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="flex space-x-7 justify-between w-full">
                            <div>
                                <a href="#" className="flex items-center py-4 px-2 gap-x-4">
                                    <img src="/icon.svg" alt="Logo" className="h-8 w-8 mr-2" />
                                    <span className="font-semibold text-gray-200 text-lg">Seshuri</span>
                                </a>
                            </div>
                            <div className="hidden md:flex items-center space-x-1">
                                {links.map(link => (
                                    <a key={link} href={`#${link.toLowerCase()}`} className="py-4 px-2 font-semibold hover:text-blue-500 transition duration-300">{link}</a>
                                ))}
                                <a href="https://clients.seshuri.com" className="py-2 px-2 font-medium bg-blue-500 rounded hover:bg-blue-400 transition duration-300">Client Portal</a>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="outline-none mobile-menu-button" onClick={toggleNavbar}>
                                <svg className=" w-6 h-6 hover:text-blue-500 "
                                    x-show="!showMenu"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
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
                        <li><a href="https://clients.seshuri.com" className="block text-md px-2 py-4 hover:bg-blue-500 transition duration-300 font-semibold">Client Portal</a></li>
                    </ul>
                </div>
            </nav>
            <section className='bg-gradient-to-br from-blue-700 to-cyan-300 pt-16'>
                <div className='md:mx-16'>
                    <div className='mt-16 md:mt-0 bg-bottom lg:bg-right bg-cover md:bg-contain bg-no-repeat h-screen flex justify-center lg:justify-start items-start lg:items-center' style={{ backgroundImage: 'url("/img-top.png")' }}>
                        <div className='text-gray-100 text-center lg:text-left text-shadow lg:ml-16 xl:ml-40 lg:-mt-96 xl:-mt-72 -mt-16 md:mt-0'>
                            <h1 className='text-6xl sm:text-8xl font-bold mb-4'>Seshuri</h1>
                            <p className='text-2xl sm:text-3xl font-semibold opacity-90 mb-8'>Presence, reimagined.</p>
                            <a href="#contact" className='bg-black text-white px-8 py-4 rounded-md font-semibold uppercase tracking-wide font-mono hover:shadow-md hover:-translate-y-0.5 transition-all duration-75'>{'>'} Let's talk</a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="about" className="pt-16 px-8 flex flex-col justify-center items-center gap-8 bg-gray-800 text-gray-200">
                <p className="font-thin tracking-widest uppercase opacity-70">Seshuri by Laminar Tech</p>
                <h2 className="text-4xl font-bold tracking-wide max-w-xl text-center">The on-demand website team that you never had to hire</h2>
                <img src="dash-device.png" className="w-auto lg:max-w-2xl" />
            </section>
            <section id="features" className="py-16 px-8 flex flex-row flex-wrap justify-center items-center gap-8 bg-gray-100 text-gray-800">
                <div>
                    <p className="font-thin tracking-widest uppercase opacity-70 mb-8">We Design</p>
                    <h2 className="text-4xl font-bold tracking-wide max-w-lg mb-4">Customised Websites for your Business Needs</h2>
                    <p className="text-xl max-w-lg opacity-90">Let your business wow the crowd without breaking the bank. Why settle for just any old template on the internet?</p>
                </div>
                <img src="app-04.png" className="w-auto lg:max-w-2xl" />
            </section>
            <section className="py-16 px-8 flex flex-row-reverse flex-wrap justify-center items-center gap-8 bg-gray-100 text-gray-800">
                <div>
                    <p className="font-thin tracking-widest uppercase opacity-70 mb-8">We Build</p>
                    <h2 className="text-4xl font-bold tracking-wide max-w-lg mb-4">Features your Customers will be Grateful for</h2>
                    <p className="text-xl max-w-lg opacity-90">We implement essential features that bring your user's experience to the next level</p>
                </div>
                <img src="app-05.png" className="w-auto lg:max-w-2xl" />
            </section>
            <section id="contact" className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h2 className="sm:text-5xl text-3xl font-bold title-font mb-4 text-gray-900">Contact Us</h2>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-xl">Reach out to learn more about us!</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <form onSubmit={handleSubmit} className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                    <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                    <textarea value={message} onChange={e => setMessage(e.target.value)} id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                {status === STATUS.SUCCESS ? (
                                    <Notification title="Success" onClose={() => setStatus(STATUS.WAITING)}>
                                        Successfully sent email
                                    </Notification>
                                ) : status === STATUS.ERROR ? (
                                    <Notification title="Error" onClose={() => setStatus(STATUS.WAITING)}>
                                        An error has occurred. Please try again
                                    </Notification>
                                ) : (
                                    <button type="submit" disabled={status === STATUS.LOADING} className="flex mx-auto text-white font-medium tracking-wide bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">{status === STATUS.LOADING ? "Loading..." : "Send!"}</button>
                                )}
                            </div>
                            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                <p><a className="text-blue-500 cursor-pointer" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
