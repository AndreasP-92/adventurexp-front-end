package adventurexpfrontend2.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
import java.security.Principal;

@Controller
public class MainController {
    @GetMapping("/")
    public String index(Model model, Principal principal){
        if (principal != null){
            System.out.println("username =========" + principal.getName());
            model.addAttribute("User", principal.getName());
        }
        return "/userClient/index";
    }


    @GetMapping("/register")
    public String register(Model model, Principal principal){
        if (principal != null){
            System.out.println("username =========" + principal.getName());
            model.addAttribute("User", principal.getName());
        }
        return "/userClient/register";
    }

    @GetMapping("/booking")
    public String booking(Model model, Principal principal){
        if (principal != null) {
            System.out.println("username =========" + principal.getName());
            model.addAttribute("User", principal.getName());
        }
        return "/userClient/booking";
    }

    @GetMapping("/profile/about/{mail}")
    public String profileAbout(Model model, Principal principal){
        if (principal != null){
            System.out.println("username =========" + principal.getName());
            model.addAttribute("User", principal.getName());
        }
        return "/userClient/profileAbout";
    }

    @GetMapping("/profile/history/{mail}")
    public String profileHistory(Model model, Principal principal){
        if (principal != null){
            System.out.println("username =========" + principal.getName());
            model.addAttribute("User", principal.getName());
        }
        return"/userClient/profileHistory";
    }


    @GetMapping("/login")
    public String login(Model model, Principal principal){
        if (principal != null){
            System.out.println("username =========" + principal.getName());
            model.addAttribute("User", principal.getName());
        }
        return "/userClient/login";
    }

    @GetMapping("/contact")
    public String contact(Model model, Principal principal){
        if (principal != null){
            System.out.println("username =========" + principal.getName());
            model.addAttribute("User", principal.getName());
        }
        return "/userClient/contact";
    }

    @GetMapping("/staff/booking/list")
    public String bookingList(Model model, Principal principal){
        if (principal != null){
            System.out.println("username =========" + principal.getName());
            model.addAttribute("User", principal.getName());
        }
        return "/staff/bookingListIndex";
    }

    @GetMapping("/activity/info/{name}")
    public String activityInfo(Model model, Principal principal){
        if (principal != null){
            System.out.println("username =========" + principal.getName());
            model.addAttribute("User", principal.getName());
        }
        return "/userClient/activityInfo";
    }

    @GetMapping("/activity/calender")
    public String activityAvailable(Model model, Principal principal){
        if (principal != null){
            System.out.println("username =========" + principal.getName());
            model.addAttribute("User", principal.getName());
        }
        return "/userClient/activityAvailable";
    }


    private final String UPLOAD_DIR = "./src/main/resources/static/images/events/";


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
    @GetMapping("/admin/bookings/closed")
    public String bookingClosed(){
        return "/adminClient/BookingListClosed";
    }

    @GetMapping("/admin/register")
    public String adminRegister(){return "/adminClient/adminRegister"; }

    @GetMapping("/admin/index")
    public String adminIndex(){
        return "/adminClient/adminIndex";
    }

    @GetMapping("/admin/profiles")
    public String adminLookUpProfiles(){
        return "/adminClient/adminLookUpProfiles";
    }

    @GetMapping("/admin/bookings")
    public String adminLookUpBookings(){
        return "/adminClient/bookingListIndex";
    }

    @GetMapping("/admin/activities")
    public String adminLookUpEvents(){
        return "/adminClient/adminLookUpEvents";
    }

    @GetMapping("/admin/support")
    public String adminSupport(){
        return "/adminClient/adminSupport";
    }

    @GetMapping("/admin/asigned/ticket")
    public String adminAsignedTicket(){
        return "/adminClient/adminAsignedTicket";
    }

    @GetMapping("/admin/createevent")
    public String createEvent(){
        return "/adminClient/createEvent";
    }

    @GetMapping("/admin/edit/profile")
    public String editProfile(){
        return "/adminClient/adminEditProfile";
    }
}
