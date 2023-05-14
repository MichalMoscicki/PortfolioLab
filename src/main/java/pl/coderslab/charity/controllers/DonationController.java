package pl.coderslab.charity.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import pl.coderslab.charity.model.Category;
import pl.coderslab.charity.model.Donation;
import pl.coderslab.charity.model.Institution;
import pl.coderslab.charity.repositories.CategoryRepository;
import pl.coderslab.charity.repositories.DonationRepository;
import pl.coderslab.charity.repositories.InstitutionRepository;

import javax.validation.Valid;
import java.util.List;

@Controller
public class DonationController {

    final private CategoryRepository categoryRepository;
    final private InstitutionRepository institutionRepository;
    final private DonationRepository donationRepository;

    public DonationController(CategoryRepository categoryRepository, InstitutionRepository institutionRepository, DonationRepository donationRepository) {
        this.categoryRepository = categoryRepository;
        this.institutionRepository = institutionRepository;
        this.donationRepository = donationRepository;
    }

    @GetMapping("/form")
    public String displayForm(Model model) {
        Donation donation = new Donation();
        model.addAttribute("donation", donation);
        List<Category> categories = categoryRepository.findAll();
        model.addAttribute("categories", categories);
        List<Institution> institutions = institutionRepository.findAll();
        model.addAttribute("institutions", institutions);

        return "form";
    }

    @PostMapping("/form")
    public String processForm(@Valid Donation donation, BindingResult res){
        if(res.hasErrors()){
            return "form";
        }
        donationRepository.save(donation);
        return "redirect:/form-confirmation";
    }

    @GetMapping("/form-confirmation")
    public String formConfirmation(){
        return "form-confirmation";
    }
}
