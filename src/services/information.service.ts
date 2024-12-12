import { Banner, Service } from "../interface/information.interface";
import InformationRepository from "../repositories/information.repository";

class InformationService {
  /**
   * @function getAllBanner - get all banner
   * @returns {Promise<Banner[]>} - banner
   */
  public async getAllBanner(): Promise<Banner[]> {
    const banners = await InformationRepository.findAllBanner();

    const formattedBanners = banners.map((banner) => {
      return {
        banner_name: banner.banner_name,
        banner_image: banner.banner_image,
        description: banner.description,
      };
    });

    return formattedBanners;
  }

  /**
   * @function getAllService - get all service
   * @returns {Promise<Service[]>} - service
   */
  public async getAllService(): Promise<Service[]> {
    const services = await InformationRepository.findAllService();

    const formattedServices = services.map((service) => {
      return {
        service_code: service.service_code,
        service_name: service.service_name,
        service_icon: service.service_icon,
        service_tariff: service.service_tariff,
      };
    });

    return formattedServices;
  }
}

export default InformationService;
