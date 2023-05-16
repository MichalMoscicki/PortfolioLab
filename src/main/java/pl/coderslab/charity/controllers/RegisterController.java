package pl.coderslab.charity.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import pl.coderslab.charity.model.User;
import pl.coderslab.charity.service.UserService;

import javax.validation.Valid;
import java.sql.ResultSet;

@Controller
public class RegisterController {

    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/register")
    public String displayRegister(Model model){
    User user = new User();
    model.addAttribute("user", user);
        return "register";
    }

    @PostMapping("/register")
    public String parseRegister(@Valid User user, BindingResult res){
        if(res.hasErrors()){
            return "register";
        }
        userService.saveUser(user);
        return "redirect:/";
    }
}
