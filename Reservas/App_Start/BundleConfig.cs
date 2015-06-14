using BundleTransformer.Core.Builders;
using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Transformers;
using BundleTransformer.Core.Translators;
using BundleTransformer.SassAndScss.Translators;
using System.Collections.Generic;
using System.Web;
using System.Web.Optimization;

namespace Reservas
{
	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Clear();
			bundles.ResetAll();

			bundles.IgnoreList.Clear();
			bundles.IgnoreList.Ignore("*.tests.js", OptimizationMode.WhenEnabled);

			BundleTable.EnableOptimizations = true;

			var nullBuilder = new NullBuilder();
			var nullOrderer = new NullOrderer();

			var scssTranslator = new SassAndScssTranslator
			{
				 IsDebugMode = true
			};

			var styleTransformer = new StyleTransformer(new List<ITranslator> { scssTranslator });

			bundles.Add(new ScriptBundle("~/scripts/angular").Include(
				"~/Assets/Libs/AngularJS/angular.js",
				"~/Assets/Libs/AngularJS/angular-route.js",
				"~/Assets/Libs/AngularJS/angular-ng-grid.js",
				"~/Assets/Libs/AngularJS/angular-resource.js",
				"~/Assets/Libs/AngularJS/angular-cookies.js",
				"~/Assets/Libs/AngularJS/angular-mocks.js",
				"~/Assets/Libs/AngularJS/angular-animate.js",
				"~/Assets/Libs/AngularJS/angular-translate.js",
				"~/Assets/Libs/AngularJS/angular-translate-loader-url.min.js"
			));

			#region Main

			var mainStyles = new Bundle("~/styles/main");
			mainStyles.IncludeDirectory("~/Assets/Styles", "*.scss");
			mainStyles.Builder = nullBuilder;
			mainStyles.Transforms.Add(styleTransformer);
			mainStyles.Transforms.Add(new CssMinify());
			mainStyles.Orderer = nullOrderer;
			BundleTable.Bundles.Add(mainStyles);

			#endregion
		}
	}
}