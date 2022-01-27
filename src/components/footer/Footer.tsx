import Flex from "../flex/Flex"
import Image from '../image'
import logoExpedia from '../../assets/logo-expedia.png';
import logoBooking from '../../assets/logo-booking.png';
import logoHotels from '../../assets/logo-hotels.png';
import logoAgoda from '../../assets/logo-agoda.png';

const Footer = () => {
  return <Flex css={{
    gridArea: 'footer',
    alignItems: 'end',
    justifyContent: 'space-around',
    marginBottom: '90px',
    width: '100%'
  }}>
      <Image
        css={{
          width: '60px',
          height: '17px',
        }}
        alt={'Expedia'} src={logoExpedia}
      />
      <Image
        css={{
          width: '75px',
          height: '13px',
        }}
        alt={'Booking'} src={logoBooking}
      />
      <Image
        css={{
          width: '75px',
          height: '15px',
        }}
        alt={'Hotels'} src={logoHotels}
      />
      <Image
        css={{
          width: '46px',
          height: '19px',
        }}
        alt={'Agoda'}
        src={logoAgoda}
      />
    </Flex>
}

export default Footer;