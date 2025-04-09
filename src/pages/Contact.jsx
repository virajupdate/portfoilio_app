import React, { Suspense, useRef, useState} from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber';
import Fox from '../models/Fox';
import Loader from '../components/Loader';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

const Contact = () => {
  const formRef = useRef(null);
  const [form,setForm] = useState({name:'',email:'',message:''});
  const [isLoading,setIsLoading] = useState(false);
  const [currentAnimation,setCurentanimation] = useState('idle');
  const {alert,showAlert,hideAlert}  = useAlert();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurentanimation('hit');

    
  const toEmail = 'vrdeshmukh2001@gmail.com';
  const fromEmail = form.email;

  // Validate email format
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Check for valid email format
  if (!isValidEmail(fromEmail)) {
    showAlert({show:true, text:'Please enter a valid email', type:'danger'})
    setTimeout(()=>{
      hideAlert();
      setCurentanimation('idle');
      setForm({name:'',email:'',message:''});
    },3000)
    return;
  }

  // Check if sender email is same as receiver email
  if (fromEmail.trim().toLowerCase() === toEmail.toLowerCase()) {
    showAlert({show:true, text:'Please enter your email', type:'danger'})
    setTimeout(()=>{
      hideAlert();
      setCurentanimation('idle');
      setForm({name:'',email:'',message:''});
    },3000)
        return;
  }


    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name:form.name,
        to_name:"Viraj Deshmukh",
        from_email:fromEmail,
        to_email:toEmail,
        message:`Email from: ${form.email}\n\n${form.message}`,
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      
    ).then(()=>{
      setIsLoading(false);
      showAlert({show:true, text:'Message Sent Successfully!!', type:'success'})
      setTimeout(()=>{
        hideAlert();
        setCurentanimation('idle');
        setForm({name:'',email:'',message:''});
      },3000)
     
    }).catch((error)=>{
      showAlert({show:true, text:'Message not sent!!', type:'danger'})
      setIsLoading(false);
      console.log(error);
      setCurentanimation('idle');
    })
  };

  const handleFocus = () => setCurentanimation('walk');
  const handleBlur = () => setCurentanimation('idle');
  
  return (
    <section className="relative flex lg:flex-row flex-col max-container h-full">
      {alert.show && <Alert {...alert}/>}
      
      <div className="flex-1 min-w-[50%] flex flex-col">
         <h1 className="head-text">Let's Connect</h1>

         <form className="w-full flex flex-col gap-7 mt-14" onSubmit={handleSubmit} ref={formRef}>
            <label className="text-black-500 font-semibold">
              Name
              <input
                type="text"
                name="name"
                className="input"
                placeholder="John Doe"
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Email
              <input
                type="email"
                name="email"
                className="input"
                placeholder="johndoe@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Your Message
              <textarea
                name="message"
                className="input"
                placeholder="Tell me how can I help you..."
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <button 
              type="submit"
              className="btn"
              disabled={isLoading}
              onFocus={handleFocus}
              onBlur={handleBlur}  
            >
              {isLoading ? 'Sending...' : 'Send Message'}

            </button>
         </form>
      </div>

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{   
            position:[0,0,5],
            fov:75,
            near:0.1,
            far:1000

          }}
          
        >
          <directionalLight intensity={1.3} position={[0,0,1]}/>
          <ambientLight intensity={0.05}/>
          <Suspense fallback={<Loader/>}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5,0.35,0 ]}
              scale={[0.5,0.5,0.5]}
              rotation={[12.66,-0.6,0]}
            />
          </Suspense>
        </Canvas>

      </div>
    </section>
  )
}

export default Contact
