import React from 'react';
import {HiArrowLeft} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage = () => {
    const nav = useNavigate()
  return (
    <div>
        <center>
            <img src={''} className="h-20 md:h-32 mt-1" alt="''" />
        </center>
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <div className="mb-4">
            <p>Welcome to TravelMates Privacy Policy. This Privacy Policy describes how TravelMates collects, uses, shares, and protects your personal information when you use our website and services.</p>
            <p>We collect personal information such as your name, email address, phone number, and travel preferences when you sign up for an account or use our services. This information is used to personalize your experience, provide customer support, and improve our services.</p>
            <p>We may share your personal information with trusted third-party service providers for purposes such as payment processing, data analysis, and marketing. However, we do not sell or rent your personal information to third parties for their own marketing purposes.</p>
            <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.</p>
            <p>By using our website and services, you consent to the collection and use of your personal information as described in this Privacy Policy. If you have any questions or concerns about our Privacy Policy, please contact us.</p>
            <p>This Privacy Policy is effective as of [date]. We may update or modify this Privacy Policy from time to time, so please review it periodically. Your continued use of our website and services after any changes indicates your acceptance of the updated Privacy Policy.</p>
        </div>
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <div className="mb-4">
            <p>Welcome to TravelMates! These Terms and Conditions govern your use of our website and services. By accessing or using our website and services, you agree to be bound by these Terms and Conditions.</p>
            <p>You must be at least 18 years old to use our website and services. By using our website and services, you represent and warrant that you are at least 18 years old.</p>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other security breach.</p>
            <p>We reserve the right to modify or terminate our website and services at any time without prior notice. We also reserve the right to modify these Terms and Conditions at any time. Your continued use of our website and services after any changes indicates your acceptance of the updated Terms and Conditions.</p>
            <p>If you have any questions or concerns about these Terms and Conditions, please contact us.</p>
        </div>
        </div>
        <button onClick={()=> nav(-1)} className='float-right mx-4 mb-2 '> <HiArrowLeft className='mr-2' size={15}/> Back</button>
    </div>
    
  );
};

export default PrivacyPolicyPage;
