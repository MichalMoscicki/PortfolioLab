package pl.coderslab.charity.service;

import org.springframework.stereotype.Service;
import pl.coderslab.charity.model.Donation;
import pl.coderslab.charity.repositories.DonationRepository;

@Service
public class DonationService {

    final private DonationRepository donationRepository;

    public DonationService(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    public void saveDonation(Donation donation){
        donationRepository.save(donation);
    }
}
