import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Works from '../components/Works';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Header />
            <main>
                <Hero /> 
                {/* <About /> */}
                <Services />
                <WhyUs />
                {/* //<Works /> */}
                <Testimonials /> 
            
                <Contact />
            </main>
             <Footer />
        </>
    );
};

export default Home;
