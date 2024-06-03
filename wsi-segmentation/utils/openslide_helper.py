def print_slide_info(sld):
    # Read the slide properties
    sld_dims = sld.dimensions
    sld_lvl_count = sld.level_count
    sld_lvl_downsamples = sld.level_downsamples
    sld_lvl_dims = sld.level_dimensions

    print("Slide dimensions:", sld_dims)
    print("Slide level count:", sld_lvl_count)
    print("Slide level downsamples:", sld_lvl_downsamples)
    print("Slide level dimensions:", sld_lvl_dims)
