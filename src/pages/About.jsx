import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import CTA  from "../components/CTA";
import { experiences, skills,socialLinks } from "../constants";

import "react-vertical-timeline-component/style.min.css";

const About = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Hello, I'm{" "}
        <span className='blue-gradient_text font-semibold drop-shadow'>
          {" "}
          Viraj
        </span>{" "}
        👋
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
        I'm a digital craftsman who turns complex problems into elegant solutions. 
        With a passion for clean code and intuitive design, I create experiences that delight users while meeting business goals. 
        Always learning, always building, always improving.
        </p>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>

        <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skill) => (
            <div className='block-container w-20 h-20' key={skill.name}>
              <div className='btn-back rounded-xl' />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Work Experience.</h3>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
          I'm a budding engineer eager to embrace new challenges and expand my horizons. 
          With a fresh perspective and dedication to continuous growth, I'm ready to transform opportunities into achievements. 
          My journey is just beginning, and I'm excited to collaborate on innovative projects that make a meaningful impact.
          </p>
        </div>

        <div className='mt-12 flex'>
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={experience.company_name}
                date={experience.date}
                iconStyle={{ background: experience.iconBg }}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: experience.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>
                    {experience.title}
                  </h3>
                  <p
                    className='text-black-500 font-medium text-base'
                    style={{ margin: 0 }}
                  >
                    {experience.company_name}
                  </p>
                </div>

                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {experience.points.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className='text-black-500/50 font-normal pl-1 text-sm'
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className='border-slate-200' />
      <br></br>
      <br></br>
      <br></br>
      
      <div className="py-10 flex flex-col">
  <h3 className="subhead-text">My Socials</h3>

  <div className="mt-16 flex flex-wrap gap-12">
    {socialLinks.map((socialLink) => (
      <a
        href={socialLink.link}
        target="_blank"
        rel="noopener noreferrer"
        key={socialLink.name}
        className="block-container w-20 h-20"
      >
        <div className="btn-back rounded-xl" />
        <div className="btn-front rounded-xl flex justify-center items-center">
          <img
            src={socialLink.icon} 
            alt={socialLink.name}  
            className="w-1/2 h-1/2 object-contain"
          />
        </div>
      </a>
    ))}
  </div>
</div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default About;
