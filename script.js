$(document).ready(function () {
    const addButton = $('.add');
    const popupForm = $('#popupForm');

    addButton.click(function () {
        popupForm.show();

    });

    const jobForm = $("#jobForm");
    jobForm.submit(function (event) {
        event.preventDefault();
        let imagename = $("#image").val();
        if (imagename == "Photosnap")
            imagename = "photosnap.svg";
        else if (imagename == "Manage")
            imagename = "manage.svg";
        else if (imagename == "Account")
            imagename = "account.svg";
        else if (imagename == "MyHome")
            imagename = "myhome.svg";
        else if (imagename == "Loop Studios")
            imagename = "loop-studios.svg";
        else if (imagename == "FaceIt")
            imagename = "faceit.svg";
        else if (imagename == "Shortly")
            imagename = "shortly.svg";
        else if (imagename == "Insure")
            imagename = "insure.svg";
        else if (imagename == "Eyecam Co.")
            imagename = "eyecam-co.svg";
        else if (imagename == "The Air Filter Company")
            imagename = "the-air-filter-company.svg";


        let image_path = "images/" + imagename;
        const formData = new FormData(this); // 'this' refers to the submitted form
        const newJob = {
            imgsrc: image_path,
            company: formData.get('company'),
            position: formData.get('position'),
            contact: formData.get('contact'),
            location: formData.get('location'),
            languages: formData.get('languages').split(',').map(lang => lang.trim()),
            role: formData.get('role'),
            tools: formData.get('tools').split(',').map(tool => tool.trim()),
            level: formData.get('level'),
            new: true,
            featured: true
        };

        addJobToList(newJob);

        $("#popupForm").hide(); // Hide the popup form using jQuery
        jobForm[0].reset(); // Reset the form using jQuery
    });


    const closeButton = $(".close");
    closeButton.click(function () {
        $("#popupForm").hide();
    });     


    function addJobToList(job) {
        let jobElement = $('<div class="job"></div>');

        let left = $('<div class="left"></div>');

        let jobLogo = $('<div class="job-logo"></div>');
        let logo = $('<img src="' + job.imgsrc + '" alt="Company Logo"/>');
        jobLogo.append(logo);
        left.append(jobLogo);

        let jobDetails = $('<div class="job-details"></div>');

        let companyNewFeatured = $('<div class="company-new-featured"></div>');
        let companyName = $('<span class="company-name">' + job.company + '</span>');
        companyNewFeatured.append(companyName);
        if (job.new) {
            let newJob = $('<span class="new-job">NEW!</span>');
            companyNewFeatured.append(newJob);
        }
        if (job.featured) {
            let featuredJob = $('<span class="featured-job">FEATURED</span>');
            companyNewFeatured.append(featuredJob);
        }
        jobDetails.append(companyNewFeatured);

        let jobPosition = $('<div class="job-position"></div>');
        let positionName = $('<span class="position-name">' + job.position + '</span>');
        jobPosition.append(positionName);

        let timeContractLocation = $('<ul class="time-contract-location"></ul>');
        let postedAtLi = $('<li class="posted-at">' + job.postedAt + '</li>');
        let contactLi = $('<li class="contract">' + job.contact + '</li>');
        let locationLi = $('<li class="location">' + job.location + '</li>');
        timeContractLocation.append(postedAtLi, contactLi, locationLi);
        jobPosition.append(timeContractLocation);
        jobDetails.append(jobPosition);

        left.append(jobDetails);

        let right = $('<div class="right"></div>');

        let deleteButton = $('<button class="delete-button">x</button>');
        right.append(deleteButton);

        let divForRllt = $('<div class="div-for-rllt"></div>');

        let roleLevelLanguagesTools = $('<div class="role-level-languages-tools"></div>');
        let roleBut = $('<button class="role">' + job.role + '</button>');
        roleBut.on('click', function () {
            // Call a function to handle search and filtering based on the selected role
            handleSearch(job.role);
        });
        roleLevelLanguagesTools.append(roleBut);
        let levelBut = $('<button class="level">' + job.level + '</button>');
        levelBut.on('click', function () {
            // Call a function to handle search and filtering based on the selected level
            handleSearch(job.level);
        });
        roleLevelLanguagesTools.append(levelBut);
        if (job.languages) {
            job.languages.forEach(function (element) {
                let language = $('<button class="language">' + element + '</button>');
                language.on('click', function () {
                    // Call a function to handle search and filtering based on the selected language
                    handleSearch(element);
                });
                roleLevelLanguagesTools.append(language);
            });
        }
        if (job.tools) {
            job.tools.forEach(function (element) {
                let tool = $('<button class="tool">' + element + '</button>');
                tool.on('click', function () {
                    // Call a function to handle search and filtering based on the selected tool
                    handleSearch(element);
                });
                roleLevelLanguagesTools.append(tool);
            });
        }
        divForRllt.append(roleLevelLanguagesTools);

        right.append(divForRllt);

        jobElement.append(left);
        jobElement.append(right);

        $('.job-container').append(jobElement);

        deleteButton.on('click', function () {
            jobElement.remove();
        });
    }

    //get data from json file

    $.getJSON("data.json", function (data) {
        console.log(data);

        data.forEach(function (element) {
            let imgsrc = element.logo;
            let company = element.company;
            let newjob = element.new;
            let featured = element.featured;
            let position = element.position;
            let postedAt = element.postedAt;
            let contract = element.contract;
            let location = element.location;
            let languages = element.languages;
            let tools = element.tools;
            let role = element.role;
            let level = element.level;

            let job = $('<div class="job"></div>');
            let left = $('<div class="left"></div>');

            let jobLogo = $('<div class="job-logo"></div>');
            let logo = $('<img src="' + imgsrc + '" alt="Company Logo"/>');
            jobLogo.append(logo);
            left.append(jobLogo);

            let jobDetails = $('<div class="job-details"></div>');

            let companyNewFeatured = $('<div class="company-new-featured"></div>');
            let companyName = $('<span class="company-name">' + company + '</span>');
            companyNewFeatured.append(companyName);
            if (newjob) {
                let newJob = $('<span class="new-job">NEW!</span>');
                companyNewFeatured.append(newJob);
            }
            if (featured) {
                let featuredJob = $('<span class="featured-job">FEATURED</span>');
                companyNewFeatured.append(featuredJob);
            }
            jobDetails.append(companyNewFeatured);

            let jobPosition = $('<div class="job-position"></div>');
            let positionName = $('<span class="position-name">' + position + '</span>');
            jobPosition.append(positionName);

            let timeContractLocation = $('<ul class="time-contract-location"></ul>');
            let postedAtLi = $('<li class="posted-at">' + postedAt + '</li>');
            let contractLi = $('<li class="contract">' + contract + '</li>');
            let locationLi = $('<li class="location">' + location + '</li>');
            timeContractLocation.append(postedAtLi, contractLi, locationLi);
            jobPosition.append(timeContractLocation);
            jobDetails.append(jobPosition);

            let divForRllt = $('<div class="div-for-rllt"></div>');

            let roleLevelLanguagesTools = $('<div class="role-level-languages-tools"></div>');
            let roleBut = $('<button class="role">' + role + '</button>');
            roleBut.on('click', function () {
                // Call a function to handle search and filtering based on the selected role
                handleSearch(role);
            });

            roleLevelLanguagesTools.append(roleBut);
            let levelBut = $('<button class="level">' + level + '</button>');
            levelBut.on('click', function () {
                // Call a function to handle search and filtering based on the selected level
                handleSearch(level);
            });
            roleLevelLanguagesTools.append(levelBut);
            if (languages) {
                languages.forEach(function (element) {
                    let language = $('<button class="language">' + element + '</button>');
                    language.on('click', function () {
                        // Call a function to handle search and filtering based on the selected language
                        handleSearch(element);
                    });
                    roleLevelLanguagesTools.append(language);
                });
            }
            if (tools) {
                tools.forEach(function (element) {
                    let tool = $('<button class="tool">' + element + '</button>');
                    tool.on('click', function () {
                        // Call a function to handle search and filtering based on the selected tool
                        handleSearch(element);
                    });
                    roleLevelLanguagesTools.append(tool);
                });
            }
            divForRllt.append(roleLevelLanguagesTools);

            left.append(jobDetails);

            let right = $('<div class="right"></div>');
            let viewButton = $('<button class="view-button">View</button>');
            viewButton.on('click', function () {
                let popup = $('<div class="popup-job"></div>');
                //change display of popup
                popup.css("display", "inline-block");
                let logo = $('<img src="' + imgsrc + '" alt="Company Logo"/>');
                popup.append(logo);


                let popupDetails = $('<div class="popup-details"></div>');

                let companyNewFeatured = $('<div class="company-new-featured"></div>');
                let companyName = $('<span class="company-name">' + company + '</span>');
                companyNewFeatured.append(companyName);
                if (newjob) {
                    let newJob = $('<span class="new-job">NEW!</span>');
                    companyNewFeatured.append(newJob);
                }
                if (featured) {
                    let featuredJob = $('<span class="featured-job">FEATURED</span>');
                    companyNewFeatured.append(featuredJob);
                }
                popupDetails.append(companyNewFeatured);

                let jobPosition = $('<div class="job-position"></div>');
                let positionName = $('<span class="position-name">' + position + '</span>');
                jobPosition.append(positionName);

                let timeContractLocation = $('<ul class="time-contract-location"></ul>');
                let postedAtLi = $('<li class="posted-at">' + postedAt + '</li>');
                let contractLi = $('<li class="contract">' + contract + '</li>');
                let locationLi = $('<li class="location">' + location + '</li>');
                timeContractLocation.append(postedAtLi, contractLi, locationLi);
                jobPosition.append(timeContractLocation);
                popupDetails.append(jobPosition);

                let divForRllt = $('<div class="div-for-rllt"></div>');

                let roleLevelLanguagesTools = $('<div class="role-level-languages-tools"></div>');
                let roleBut = $('<button class="role">' + role + '</button>');
                roleBut.on('click', function () {
                    // Call a function to handle search and filtering based on the selected role
                    handleSearch(role);
                });
                roleLevelLanguagesTools.append(roleBut);
                let levelBut = $('<button class="level">' + level + '</button>');
                levelBut.on('click', function () {
                    // Call a function to handle search and filtering based on the selected level
                    handleSearch(level);
                });
                roleLevelLanguagesTools.append(levelBut);
                if (languages) {
                    languages.forEach(function (element) {
                        let language = $('<button class="language">' + element + '</button>');
                        language.on('click', function () {
                            // Call a function to handle search and filtering based on the selected language
                            handleSearch(element);
                        });
                        roleLevelLanguagesTools.append(language);
                    });
                }
                if (tools) {
                    tools.forEach(function (element) {
                        let tool = $('<button class="tool">' + element + '</button>');
                        tool.on('click', function () {
                            // Call a function to handle search and filtering based on the selected tool
                            handleSearch(element);
                        });
                        roleLevelLanguagesTools.append(tool);
                    });
                }
                divForRllt.append(roleLevelLanguagesTools);
                popupDetails.append(divForRllt);

                let closeButton = $('<button class="close-button">x</button>');
                closeButton.on('click', function () {
                    popup.remove();
                });
                popup.append(closeButton);

                popup.append(popupDetails);

                $('body').append(popup);
            });



            let deleteButton = $('<button class="delete-button">x</button>');
            deleteButton.on('click', function () {
                job.remove();
            });

            right.append(deleteButton);
            right.append(divForRllt);
            right.append(viewButton);

            job.append(left);
            job.append(right);

            let jobContainer = $('.job-container');
            jobContainer.append(job);
        });
    });





    let selectedFilters = []; // Initialize an array to store selected filters

    function handleSearch(keyword) {
        let jobListings = $('.job');
        let searchFilter = $('.search-filter');
        let searchdiv = $(".search");

        let clearButton = searchdiv.find('.clear-button');
        if (!clearButton.length) {
            clearButton = $('<button class="clear-button">Clear</button>').appendTo(searchdiv);

            clearButton.on('click', function () {
                searchFilter.val('');
                clearButton.hide();

                // Clear filter buttons
                searchFilter.empty();

                jobListings.show();

                // Clear selected filters
                selectedFilters = [];
            });
        }

        let newButton = $('<button class="new-button"></button>').text(keyword);

        // Check if the keyword is already in the selected filters
        let lowerKeyword = keyword.toLowerCase();
        if ($.inArray(lowerKeyword, selectedFilters) !== -1) {
            // If the filter is already selected, return without making any changes
            return;
        }

        // Add the keyword to the selected filters
        selectedFilters.push(lowerKeyword);

        // Filter the jobs
        jobListings.each(function () {
            let jobLanguages = $(this).find('.language').map(function () {
                return $(this).text().toLowerCase();
            }).get();
            let jobTools = $(this).find('.tool').map(function () {
                return $(this).text().toLowerCase();
            }).get();
            let jobRole = $(this).find('.role').text().toLowerCase();
            let jobLevel = $(this).find('.level').text().toLowerCase();

            // Check if all selected filters are included in the job listing
            let allFiltersIncluded = selectedFilters.every(function (filter) {
                return $.inArray(filter, jobLanguages) !== -1 || $.inArray(filter, jobTools) !== -1 || jobRole === filter || jobLevel === filter;
            });

            if (allFiltersIncluded) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        let closeButton = $('<span class="close-button">×</span>');

        newButton.append(closeButton);
        searchFilter.append(newButton);

        closeButton.on('click', function (event) {
            event.stopPropagation();
            newButton.remove();

            // Remove the filter from the selected filters
            let indexToRemove = selectedFilters.indexOf(lowerKeyword);
            if (indexToRemove !== -1) {
                selectedFilters.splice(indexToRemove, 1);
            }

            if (selectedFilters.length === 0) {
                clearButton.hide();
            }

            // Filter the jobs based on the remaining selected filters
            jobListings.each(function () {
                let jobLanguages = $(this).find('.language').map(function () {
                    return $(this).text().toLowerCase();
                }).get();
                let jobTools = $(this).find('.tool').map(function () {
                    return $(this).text().toLowerCase();
                }).get();
                let jobRole = $(this).find('.role').text().toLowerCase();
                let jobLevel = $(this).find('.level').text().toLowerCase();

                // Check if all remaining selected filters are included in the job listing
                let allFiltersIncluded = selectedFilters.every(function (filter) {
                    return $.inArray(filter, jobLanguages) !== -1 || $.inArray(filter, jobTools) !== -1 || jobRole === filter || jobLevel === filter;
                });

                if (allFiltersIncluded) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });

        clearButton.show();
    }



});