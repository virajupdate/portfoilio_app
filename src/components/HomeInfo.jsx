import React from 'react'
import { Link } from 'react-router-dom';
import {arrow} from '../assets/icons'

const InfoBox = ({text, link, btnText}) => (
    <div className="sm:text-xl text-center neo-brutalism-blue py-4 px-8 mx-5 relative">
        <p className="font-small text-white mb-8 whitespace-pre-line">
            {text}
        </p>
        <div className="flex justify-center mt-4">
            <Link to={link} className="neo-brutalism-white neo-btn inline-flex items-center justify-center gap-2 px-3 py-1 text-sm">
                {btnText}
                <img src={arrow} className="w-3 h-3 object-contain" />
            </Link>
        </div>
    </div>
)

const renderContent = {
    1:(
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Viraj</span>
        👋
        <br />
        A Software Engineer from India.
        </h1>
    ),
    2:(
        <InfoBox
            text={"Transforming ideas into digital experiences, one pixel at a time."}
            link="/about"
            btnText="Learn More"
        />
    ),
    3:(
        <InfoBox
        text={"Where imagination meets implementation — explore my digital playground."}
        link="/projects"
        btnText="Explore Projects"
    />
    ),
    4:( <InfoBox
        text={"Let's turn your vision into reality — drop me a line and let's connect."}
        link="/contact"
        btnText="Let's Connect"
    />
    ),
}

const HomeInfo = ({currentStage}) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo