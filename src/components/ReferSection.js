import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { WhatsappShareButton, EmailShareButton } from 'react-share';

const ReferSection = () => {
    const referralLink = 'your_referral_link'; // Replace with your actual referral link

    return (
        <div>
            <h2>Refer and Earn</h2>
            <p>Share your referral link with friends and earn rewards!</p>
            <input type="text" value={referralLink} readOnly />
            <div>
                <WhatsappShareButton title="Check out this amazing referral program!" url={referralLink}>
                    <FaShareAlt />
                </WhatsappShareButton>
                <EmailShareButton subject="Check out this amazing referral program!" body={`Hey, I found this cool referral program: ${referralLink}`}>
                    <FaShareAlt />
                </EmailShareButton>
                {/* Add more share buttons as needed */}
            </div>
        </div>
    );
};

export default ReferSection;
