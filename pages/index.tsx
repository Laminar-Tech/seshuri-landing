import React from 'react'

export default function index() {
    return (
        <div>
            <nav className='p-8 flex justify-around bg-black text-white'>
                <p className="text-xl font-bold tracking-wider">Seshuri</p>
                <ul className="flex gap-x-8">
                    <li><p>About</p></li>
                    <li><p>Features</p></li>
                    <li><p>Client Portal</p></li>
                </ul>
            </nav>
            <section className='bg-gradient-to-br from-blue-700 to-cyan-300 pt-16'>
                <div className='md:mx-16'>
                    <div className='bg-bottom lg:bg-right bg-cover md:bg-contain bg-no-repeat h-screen flex justify-center lg:justify-start items-start lg:items-center' style={{ backgroundImage: 'url("/img-top.png")' }}>
                        <div className='text-gray-100 text-center text-shadow lg:ml-16 xl:ml-40 lg:-mt-96 xl:-mt-72'>
                            <h1 className='text-8xl font-bold mb-4'>Seshuri</h1>
                            <p className='text-3xl font-semibold opacity-90 mb-8'>Presence, reimagined.</p>
                            <button className='bg-black text-white px-8 py-4 rounded-md font-semibold uppercase tracking-wide font-mono hover:shadow-md hover:-translate-y-0.5 transition-all duration-75'>{'>'} Let's talk</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-16 flex flex-col justify-center items-center gap-8 bg-gray-800 text-gray-200">
                <p className="font-thin tracking-widest uppercase opacity-70">Seshuri by Laminar Tech</p>
                <h2 className="text-4xl font-bold tracking-wide max-w-xl text-center">The on-demand website team that you never had to hire</h2>
                <img src="dash-device.png" className="max-w-2xl" />
            </section>
        </div>
    )
}
