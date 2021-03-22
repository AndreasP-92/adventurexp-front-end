package adventurexpfrontend2.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Controller
public class MainController {
    @GetMapping("/")
    public String index(){
        return "/userClient/index";
    }
//

    @GetMapping("/createevent")
    public String createEvent(){
        return "/staff/createEvent";
    }

    @GetMapping("/register")
    public String register(){return "/userClient/register";}

    @GetMapping("/booking")
    public String booking(){return "/userClient/booking";}

    @GetMapping("/profile/about/{mail}")
    public String profileAbout(){
        return "/userClient/profileAbout";
    }

    @GetMapping("/profile/history/{mail}")
    public String profileHistory(){
        return"/userClient/profileHistory";
    }


    @GetMapping("/login")
    public String login(){
        return "/userClient/login";
    }

    @GetMapping("/contact/")
    public String contact(){
        return "/userClient/contact";
    }

    @GetMapping("/staff/booking/list")
    public String bookingList(){
        return "/staff/bookingListIndex";
    }

    @GetMapping("/staff/booking/list/Closed")
    public String bookingClosed(){
        return "/staff/bookingListClosed";
    }

    private final String UPLOAD_DIR = "./src/main/resources/static/images/";

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file, RedirectAttributes attributes) {

        // check if file is empty
//        if (file.isEmpty()) {
//            attributes.addFlashAttribute("message", "Please select a file to upload.");
//            return "redirect:/createevent";
//        }

        // normalize the file path
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        // save the file on the local file system
        try {
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // return success response
//        attributes.addFlashAttribute("message", "You successfully uploaded " + fileName + '!');

        return "redirect:/";
    }


    //----------------------------ADMIN-------------------------
    @GetMapping("/admin/register")
    public String adminRegister(){return "/adminClient/adminRegister"; }

    @GetMapping("/admin/profilelist")
    public String adminProfilelist(){return "/adminClient/adminProfilelist";}

}