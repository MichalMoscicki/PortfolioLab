package pl.coderslab.charity.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.model.Category;
import pl.coderslab.charity.model.Donation;
import pl.coderslab.charity.model.Institution;
import pl.coderslab.charity.repositories.CategoryRepository;
import pl.coderslab.charity.repositories.DonationRepository;
import pl.coderslab.charity.repositories.InstitutionRepository;

import java.util.List;

@Controller
public class DonationController {

    final private CategoryRepository categoryRepository;
    final private InstitutionRepository institutionRepository;

    public DonationController(CategoryRepository categoryRepository, InstitutionRepository institutionRepository) {
        this.categoryRepository = categoryRepository;
        this.institutionRepository = institutionRepository;
    }

    @RequestMapping("/form")
    public String displayForm(Model model) {
        Donation donation = new Donation();
        model.addAttribute("donation", donation);
        List<Category> categories = categoryRepository.findAll();
        model.addAttribute("categories", categories);
        List<Institution> institutions = institutionRepository.findAll();
        model.addAttribute("institutions", institutions);

        return "form";
    }
}
