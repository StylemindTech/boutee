const cardImg = new Proxy({"src":"/_astro/card-img1.CAhKK9bt.png","width":400,"height":400,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/card-img1.png";
							}
							
							return target[name];
						}
					});

const cardImg1 = new Proxy({"src":"/_astro/card-img2.D5Itj881.png","width":400,"height":400,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/card-img2.png";
							}
							
							return target[name];
						}
					});

const cardImg2 = new Proxy({"src":"/_astro/card-img3.geosCGGr.png","width":400,"height":400,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/card-img3.png";
							}
							
							return target[name];
						}
					});

export { cardImg1 as a, cardImg2 as b, cardImg as c };
