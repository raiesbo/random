# Three pillars of the Clean Front-End Developer.

- Responsive design:
    - Fluid layouts
    - Media queries
    - Responsive images
    - Correct units
    - Desktop-first vs Mofile-first

- Maintainable and scalable code:
    - Clean
    - Easy-to-understand
    - Growth
    - Reusable
    - How to organize files
    - Hot to name classes
    - How to structure HTML

- Web performance:
    - Less HTTP requests
    - Less code
    - Compress code
    - Use a CSS preprocessor
    - Less images
    - Compress images

We have to ask ourself all the time if our codes agrees with all the previous topics to make sure we do a good job.


#### What happens behind the scenes when a page is loaded?

HTTP request, domain servers... not important right now to us. We focus on what happened when the we open the brower.

Steps:

Load HTML => Parse HTML ====> Document Objext Model (DOM)

                |=> Load CSS => Parse CSS (>Rec. conficting CSS declarations + Process final CSS values<) ====> CSS Objext Model (CSSOM)
                                                                                                                        |=> Render tree => Website rendering.
                                                                                                                                            |=> Final render

#### Importance Cascade

| IMPORTANCE | SPECIFICITY | SOURCE ORDER |
|------------|-------------|--------------|
| User !important | Inline Styles | The last declaration is applied |
| Author !important | IDs | |
| Author declaratoins | Classes, pseudo-classes, attribute | |
| User declarations | Elements, pseudo-elements | |
| Default browser declaratons | | |


