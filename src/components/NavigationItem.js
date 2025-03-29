import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiUserLine, RiFileTextLine, RiNotificationLine, RiChatSmileLine, RiRestaurantLine, RiLogoutBoxLine } from 'react-icons/ri';

const NavigationItem = ({ icon, text, to }) => {
    const IconComponent = icon;
    const router = useRouter();


    const isActive = true;

    return (
        <Link href={`/user/${to}`} className={`hover:border-b-2 border-primary p-3 text-center flex flex-row items-center rounded-l-md w-[90%] gap-2 ${isActive ? 'bg-white text-primary' : ''
            }`}>



            <div className="bg-primary rounded-full p-1">
                <IconComponent size={15} className={`text-${isActive ? 'white' : 'black'}`} />
            </div>
            <h3>{text}</h3>

        </Link>
    );
};

export default NavigationItem;
