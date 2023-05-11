package pl.coderslab.charity.controllers;

import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.model.Donation;
import pl.coderslab.charity.model.Institution;
import pl.coderslab.charity.repositories.DonationRepository;
import pl.coderslab.charity.repositories.InstitutionRepository;

import java.util.List;


@Controller
public class HomeController {

    final private InstitutionRepository institutionRepository;
    final private DonationRepository donationRepository;

    public HomeController(InstitutionRepository institutionRepository, DonationRepository donationRepository) {
        this.institutionRepository = institutionRepository;
        this.donationRepository = donationRepository;
    }

    @RequestMapping("/")
    public String homeAction(Model model) {
        List<Institution> institutions = institutionRepository.findAll();
        model.addAttribute("institutions", institutions);
        List<Donation> donations = donationRepository.findAll();
        int bagsCount = 0;
        int donationsCount = 0;
        for (Donation donation : donations) {
            bagsCount += donation.getQuantity();
            donationsCount++;
        }
        model.addAttribute("bagsCount", bagsCount);
        model.addAttribute("donationsCount", donationsCount);
        return "index";
    }
}
