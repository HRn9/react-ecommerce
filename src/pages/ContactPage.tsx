import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Cart from '../components/cart/Cart';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  font-size: 2.5rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  color: #ff6b6b;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const InfoIcon = styled.div`
  font-size: 1.5rem;
  margin-top: 0.25rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const InfoText = styled.p`
  color: #666;
  line-height: 1.6;
`;

const MapSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.1rem;
  margin-top: 1rem;
`;

const SuccessMessage = styled.div`
  background: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 1rem;
`;

const ContactPage: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCartClick = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <PageContainer>
      <Header onCartClick={handleCartClick} />
      <MainContent>
        <ContentWrapper>
          <Title>Contact Us</Title>
          
          <ContactGrid>
            <ContactCard>
              <CardTitle>Send us a Message</CardTitle>
              <ContactForm onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="message">Message</Label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </FormGroup>
                
                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </SubmitButton>
                
                {showSuccess && (
                  <SuccessMessage>
                    Thank you for your message! We'll get back to you within 24 hours.
                  </SuccessMessage>
                )}
              </ContactForm>
            </ContactCard>

            <ContactCard>
              <CardTitle>Get in Touch</CardTitle>
              <ContactInfo>
                <InfoItem>
                  <InfoIcon>📍</InfoIcon>
                  <InfoContent>
                    <InfoTitle>Address</InfoTitle>
                    <InfoText>
                      123 Food Street<br />
                      Delivery City, DC 12345<br />
                      United States
                    </InfoText>
                  </InfoContent>
                </InfoItem>
                
                <InfoItem>
                  <InfoIcon>📞</InfoIcon>
                  <InfoContent>
                    <InfoTitle>Phone</InfoTitle>
                    <InfoText>
                      Customer Service: +1 (234) 567-890<br />
                      Restaurant Partners: +1 (234) 567-891
                    </InfoText>
                  </InfoContent>
                </InfoItem>
                
                <InfoItem>
                  <InfoIcon>✉️</InfoIcon>
                  <InfoContent>
                    <InfoTitle>Email</InfoTitle>
                    <InfoText>
                      General: info@fooddelivery.com<br />
                      Support: support@fooddelivery.com<br />
                      Partnerships: partners@fooddelivery.com
                    </InfoText>
                  </InfoContent>
                </InfoItem>
                
                <InfoItem>
                  <InfoIcon>🕒</InfoIcon>
                  <InfoContent>
                    <InfoTitle>Business Hours</InfoTitle>
                    <InfoText>
                      Monday - Friday: 8:00 AM - 10:00 PM<br />
                      Saturday - Sunday: 9:00 AM - 11:00 PM<br />
                      Customer Support: 24/7
                    </InfoText>
                  </InfoContent>
                </InfoItem>
              </ContactInfo>
            </ContactCard>
          </ContactGrid>

          <MapSection>
            <CardTitle>Find Us</CardTitle>
            <MapPlaceholder>
              🗺️ Interactive Map Coming Soon
            </MapPlaceholder>
          </MapSection>
        </ContentWrapper>
      </MainContent>
      {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
      <Footer />
    </PageContainer>
  );
};

export default ContactPage; 