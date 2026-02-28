package com.cei.internetcafe.user.service;

import com.cei.internetcafe.user.model.ProfileModel;
import com.cei.internetcafe.user.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public ProfileModel createProfile(ProfileModel profile) {
        return profileRepository.save(profile);
    }

    // Convenience overload used by the controller
    public ProfileModel createProfile(String fname, String lname, Long userId) {
        ProfileModel profile = new ProfileModel(fname, lname, LocalDateTime.now());
        // set id if you want profile PK to match user id
        // WARNING: normally primary keys are generated; only set if your schema expects userId as PK
        try {
            java.lang.reflect.Field idField = ProfileModel.class.getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(profile, userId);
        } catch (Exception ignored) {
            // ignore if we can't set id — DB will generate it
        }
        return profileRepository.save(profile);
    }

    public ProfileModel getProfileById(Long id) {
        return profileRepository.findById(id).orElse(null);
    }

    public ProfileModel updateProfile(ProfileModel profile) {
        if (profileRepository.existsById(profile.getId())) {
            return profileRepository.save(profile);
        }
        return null;
    }

    // rename and make void — delete operation
    public void deleteProfile(Long id) {
        if (profileRepository.existsById(id)) {
            profileRepository.deleteById(id);
        }
    }
}